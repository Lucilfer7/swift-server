import express from 'express';
import {
    getRoles, getWorks, getWorkByID, createWork, updateWork, deleteWork, connectWorkToAuthor, getWorksByAuthorID
} from '../controllers/works/works.controller.js';
import { uploadWorksImage } from '../multerConfig.js';

const worksRouter = express.Router();

worksRouter.get('/works', getWorks);
worksRouter.get('/roles', getRoles);
worksRouter.get('/works/:worksID', getWorkByID);
worksRouter.get('/works/author/:authorID', getWorksByAuthorID);
worksRouter.post('/works', uploadWorksImage.single('image'), createWork);
worksRouter.put('/works/:worksID', updateWork);
worksRouter.delete('/works/:worksID', deleteWork);
worksRouter.post('/works/:worksID/link-authors', connectWorkToAuthor);

export default worksRouter;
