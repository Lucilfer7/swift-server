// middleware.js
import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.static("public"));

export default app;
