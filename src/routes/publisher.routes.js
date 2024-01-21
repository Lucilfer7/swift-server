import { Router } from "express";
import {
    getPublisherByID,
    getPublishers,
    createPublisher,
    deletePublisher,
    updatePublisher,
} from "../controllers/publisher/publisher.controller.js";

const publisherRouter = Router();

publisherRouter.get("/publisher", getPublishers);
publisherRouter.get("/publisher/:id", getPublisherByID);
publisherRouter.post("/publisher", createPublisher);
publisherRouter.put("/publisher/:id", updatePublisher);
publisherRouter.delete("/publisher/:id", deletePublisher);

export default publisherRouter;
