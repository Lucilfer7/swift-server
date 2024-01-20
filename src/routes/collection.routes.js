import { Router } from "express";
import { createCollection, getCollection } from "../controllers/collection/collection.controller.js";

const collectionRouter = Router();

collectionRouter.get("/collection", getCollection);
collectionRouter.get("/collection", getCollection);
collectionRouter.post("/collection", createCollection);
collectionRouter.put("/collection");
collectionRouter.delete("/collection");

export default collectionRouter;
