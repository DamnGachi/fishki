import express, { Express } from 'express';
import { json, raw, text, urlencoded } from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routing/index'
const {sequelize} = require("./database/database");



dotenv.config();
const port = process.env.PORT;
const app: Express = express();


app.use(cors({
    origin: '*',
    methods: '*',
    // exposedHeaders: 'Content-Range,X-Content-Range',
    allowedHeaders: '*',
    credentials: true
}))
app.use(json());
app.use(raw());
app.use(text());
app.use(urlencoded({ extended: false }));


app.use(router);


app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

