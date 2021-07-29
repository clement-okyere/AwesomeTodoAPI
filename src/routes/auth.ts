
import * as jwt from "jsonwebtoken";
import * as _ from "lodash";
import { Request, Response, Router } from "express";
import config from "config";
const route:Router = Router();
import {loginSchema, registrationSchema, validate, getErrorMessage } from "../utils/validation";
import {User } from "../models/user";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/helper";
import { OAuth2Client } from 'google-auth-library';


route.post("/login", async (req: Request, res: Response) => {
  const { error } = validate(loginSchema, req.body);
  if (error) return res.status(400).send(getErrorMessage(error));

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(401).send("Invalid username or password");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
        return res.status(401).send("Invalid username or password");

  res.send("");
});


route.post('/login/google', async (req: Request, res: Response) => {
  
    console.log('CLIENT_ID', config.get('CLIENT_ID'));
    const client = new OAuth2Client(config.get('CLIENT_ID'));
    // let user = await User.findOne({ email: req.body.email });
    // if (!user) return res.status(401).send('Invalid username or password');

  const { token } = req.body;
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: config.get('CLIENT_ID'),
  });

  //@ts-ignore
  const { email_verified, name, email } = ticket.getPayload();
  console.log("name", name);

  if (email_verified) {
     let user = await User.findOne({ email });
     if (!user) return res.status(401).send('Invalid username or password');
    const token = generateToken({ id: user._id });
    return res.send(token);
  }

  return res.status(401).send('Invalid username or password');
});

route.post('/signup', async (req: Request, res: Response) => {
    console.log('req.body', req.body);
    const { error } = validate(registrationSchema, req.body);
    if (error) return res.status(400).send(getErrorMessage(error));

    let user = await User.findOne({ email: req.body.email });
    console.log('user', user);
    if (user) return res.status(400).send('email already exist!');

    user = new User(
        _.pick(req.body, ['firstname', 'lastname', 'email', 'password'])
    );
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    const result = await user.save();
    console.log('result', result);

    const token = generateToken({ id: result._id });
    res.send(token);
});


route.post('/signup/google', async (req: Request, res: Response) => {
    console.log('CLIENT_ID', config.get('CLIENT_ID'));
    const client = new OAuth2Client(config.get('CLIENT_ID'));
    // let user = await User.findOne({ email: req.body.email });
    // if (!user) return res.status(401).send('Invalid username or password');

     const { token } = req.body;
      const ticket = await client.verifyIdToken({
          idToken: token,
          audience: config.get('CLIENT_ID'),
      });

  //@ts-ignore
  const { email_verified, name, email } = ticket.getPayload();
  
  if (email_verified) {
    let user = await User.findOne({ email });
    console.log('user', user);
    if (user) return res.status(400).send('email already exist!');
    
    let newUser = new User({
      firstname: name.split(" ")[0],
      lastname: name.split(" ")[1],
      email
    });

    const result = await newUser.save();
    const token = generateToken({ id: result._id });
    return res.send(token);
  }

  return res.status(401).send('Invalid email');
});

export default route;