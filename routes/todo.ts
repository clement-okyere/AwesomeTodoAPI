import {Request, Response, Router} from "express";
const route:Router = Router();

route.get('/', async (req: Request, res:Response) => {
    res.status(200).send("todo list")
});

route.post("/", async (req: Request, res: Response) => {
    res.status(200).send({
        name: "Todo",
        completed: true
  });
});

export default route;

