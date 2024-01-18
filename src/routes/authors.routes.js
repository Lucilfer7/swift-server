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

import {uploadAuthorImage, uploadBookImage} from "../multerConfig.js";

const authorRouter = express.Router();

authorRouter.get("/author", getAuthors);
authorRouter.get("/author/count", getCountOfAuthors);
authorRouter.get("/author/:id", getAuthorByID);
authorRouter.post("/author", uploadAuthorImage.single("image"), createAuthor);
authorRouter.put("/author/:id", uploadAuthorImage.single("image"), updateAuthor);
authorRouter.delete("/author/:id", deleteAuthor);

export default authorRouter;
