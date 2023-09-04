import express, { Application } from "express";
import cors from "cors";

const app: Application = express();

// cors middlewire
app.use(cors());

// parser middlewires
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
