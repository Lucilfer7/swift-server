import { Router } from "express";
import { getCollection } from "../controllers/collection/collection.controller.js";

const collectionRouter = Router();

collectionRouter.get("/collection", getCollection);

collectionRouter.post("/collection");

collectionRouter.put("/collection", (req, res) => {
  res.send("Updating collection");
});

collectionRouter.delete("/collection", (req, res) => {
  res.send("Deleting collection");
});

export default collectionRouter;
