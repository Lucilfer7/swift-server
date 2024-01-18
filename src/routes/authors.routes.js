// authorRoutes.js
import express from "express";
import {
  getAuthors,
  getCountOfAuthors,
  getAuthorByID,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} from "../controllers/author/authors.controller.js";

import upload from "../multerConfig.js";

const authorRouter = express.Router();

authorRouter.get("/author", getAuthors);
authorRouter.get("/author/count", getCountOfAuthors);
authorRouter.get("/author/:id", getAuthorByID);
authorRouter.post("/author", upload.single("image"), createAuthor);
authorRouter.put("/author/:id", upload.single("image"), updateAuthor);
authorRouter.delete("/author/:id", deleteAuthor);

export default authorRouter;
