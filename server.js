import express from 'express';
import {APIPORT} from './src/config.js';
import hbs from 'hbs';
import routes from "./routes/routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);

app.set("view engine", "hbs");


app.listen(APIPORT, () => {
    console.log("API ON");
});