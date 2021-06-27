import todos from '../routes/todo';
import auth from '../routes/auth';
import express from "express";
import cors from "cors";

const routes = (app: express.Application) => {
   app.use(cors({
      origin: "*"
   }));
   app.use(express.json());
   app.use("/api/todos", todos);
   app.use("/api/auth", auth);
}

export default routes;