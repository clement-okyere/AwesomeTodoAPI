import express from "express";
import mongoose from "mongoose";
import route from "./routes/todo";
import routes from "./startup/routes";
const app = express();

mongoose
    .connect("mongodb://localhost/todo", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
  .then(() => console.log("connected to mongodb successfully"))
  .catch((err) => console.log("error connecting to mongodb"));
  

routes(app);

const PORT = process.env.port || 3000;
app.listen(PORT, () => {
    console.log(`Awesome Todo Api listening on ${PORT}!`);
});

