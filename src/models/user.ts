import mongoose from "mongoose";
import { TodoDoc, UserDoc } from "../utils/types";

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100
    },
    lastname: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100
    },
     email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100,
        unique: true
    },
    password: {
        type: String,
        // required: true
    },
});

export const User = mongoose.model<UserDoc>("User", userSchema);

