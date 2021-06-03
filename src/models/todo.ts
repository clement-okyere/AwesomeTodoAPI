import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 500
    },
    completed: {
        type: Boolean,
        default: false
    }
});

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;