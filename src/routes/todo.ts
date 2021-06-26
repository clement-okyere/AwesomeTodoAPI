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

route.put('/:id/complete', async (req: Request, res: Response) => {

    let todo = await Todo.findById(req.params.id);

    if (!todo)
        return res.status(400).send(`Todo with id ${req.params.id} not found`);
    
    todo.completed = !todo.completed;

    const result = await todo.save()  
    res.status(200).send(result);
});

export default route;

