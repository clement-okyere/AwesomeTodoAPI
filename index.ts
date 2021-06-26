import express from 'express';
import mongoose from 'mongoose';
import routes from './src/startup/routes';
import dotenv from 'dotenv'
dotenv.config();
const app = express();

mongoose
    .connect('mongodb://localhost/todo', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('connected to mongodb successfully'))
    .catch((err) => console.log('error connecting to mongodb'));

routes(app);

const PORT = process.env.port || 3001;
const server = app.listen(PORT, () => {
    console.log(`Awesome Todo Api listening on ${PORT}!`);
});

export default server;
