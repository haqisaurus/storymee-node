import express from "express";
import bodyParser from "body-parser";
import { connectDB } from "./config/db";
import { router } from "./router/router";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import expressValidator from "express-validator";
dotenv.config();

const app = express();
const port = process.env.PORT;
var corsOptions = {
    origin: ["http://localhost:3000", "https://storymee.com", "https://www.storymee.com"],
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(morgan(":method :url :status :res[content-length] - :response-time ms"));
connectDB()
    .then(() => {
        console.log("database connected");
    })
    .catch((e) => {
        console.log("error", e);
    });

router(app);
// mulai server express
app.listen(port, () => {
    console.log(`[server] server dimulai di http://localhost:${port} ⚡`);
});
