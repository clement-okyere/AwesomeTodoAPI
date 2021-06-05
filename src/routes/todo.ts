import { Request, Response, Router } from "express";
import Todo from '../models/todo';
const route:Router = Router();

route.get('/', async (req: Request, res: Response) => { 
    const todos = await Todo.find().sort("name");
    res.status(200).send(todos)
});

route.post("/", async (req: Request, res: Response) => {

    const todo = new Todo({
        name: req.body.name,
        completed: req.body.completed
    });

    const result = await todo.save();
    res.status(200).send(result);
});

export default route;

