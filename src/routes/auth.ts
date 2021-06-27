
import * as jwt from "jsonwebtoken";
import * as _ from "lodash";
import { Request, Response, Router } from "express";
import config from "config";
const route:Router = Router();
import {loginSchema, registrationSchema, validate, getErrorMessage } from "../utils/validation";
import {User } from "../models/user";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/helper";

route.post("/login", async (req, res) => {
  const { error } = validate(loginSchema, req.body);
  if (error) return res.status(400).send(getErrorMessage(error));

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(401).send("Invalid username or password");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
        return res.status(401).send("Invalid username or password");

  res.send("");
});

route.post("/signup", async (req, res) => {
  const { error } = validate(registrationSchema, req.body);
  if (error) return res.status(400).send(getErrorMessage(error));

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("email already exist!");

  user = new User(_.pick(req.body, ["firstname", "lastname", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  const result = await user.save();
    
  const token = generateToken({ id: result._id, });
  res.send(token);
});

export default route;