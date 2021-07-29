import express from 'express';
import mongoose from 'mongoose';
import routes from './src/startup/routes';
import dotenv from 'dotenv'
import config from "config";
dotenv.config();
const app = express();

console.log("Db Configurations", config.get("db"))
mongoose
    .connect(config.get('db'), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('connected to mongodb successfully'))
    .catch((err) => console.log('error connecting to mongodb'));

routes(app);

const PORT = process.env.port || config.get("PORT");
const server = app.listen(PORT, () => {
    console.log(`Awesome Todo Api listening on ${PORT}!`);
});

export default server;
