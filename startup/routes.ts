import todos from '../routes/todo';
import express from "express";

const routes = (app: express.Application) => {
   app.use(express.json());
   app.use("/api/todos", todos);
}

export default routes;