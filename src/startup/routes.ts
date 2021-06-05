import todos from '../routes/todo';
import express from "express";
import cors from "cors";

const routes = (app: express.Application) => {
   app.use(cors({
      origin: "*"
   }));
   app.use(express.json());
   app.use("/api/todos", todos);
}

export default routes;