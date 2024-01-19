import { Router } from "express";
import {
  createGenre,
  deleteGenre,
  getGenreByID,
  getGenres,
  updateGenre
} from '../controllers/genre/genre.controller.js'

const genreRouter = Router();

genreRouter.get("/genre", getGenres);
genreRouter.get("/genre/:id", getGenreByID);
genreRouter.post("/genre", createGenre);
genreRouter.put("/genre/:id", updateGenre);
genreRouter.delete("/genre/:id", deleteGenre);

export default genreRouter;
