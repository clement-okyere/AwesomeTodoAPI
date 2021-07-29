
import jwt from "jsonwebtoken";
import config from "config";

export const generateToken = (data: any) => {
     const token = jwt.sign(
        { _id: 1 },
         config.get("jwtPrivateKey"),
        {expiresIn: "7d"}
    );
    return token;
}