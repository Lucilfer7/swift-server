// authorRoutes.js
import express from "express";
import {
  getAuthors,
  getAuthorByID,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} from "../controllers/author/author.controller.js";

import {uploadAuthorImage, uploadBookImage} from "../multerConfig.js";

const authorRouter = express.Router();

authorRouter.get("/author", getAuthors);
authorRouter.get("/author/:id", getAuthorByID);
authorRouter.post("/author", uploadAuthorImage.single("image"), createAuthor);
authorRouter.put("/author/:id", uploadAuthorImage.single("image"), updateAuthor);
authorRouter.delete("/author/:id", deleteAuthor);

export default authorRouter;
