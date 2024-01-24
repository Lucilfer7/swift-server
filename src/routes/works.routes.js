import express from 'express';
import { getRoles, getWorks, getWorkByID, createWork, updateWork, deleteWork, connectWorkToAuthor, getWorkFullInfo } from '../controllers/works/works.controller.js';
import { uploadWorksImage } from '../multerConfig.js';

const worksRouter = express.Router();

worksRouter.get('/works', getWorks);
worksRouter.get('/works/full/:workID', getWorkFullInfo);
worksRouter.get('/roles', getRoles);
worksRouter.get('/works/:workID', getWorkByID);
worksRouter.post('/works', uploadWorksImage.single('image'), createWork);
worksRouter.put('/works/:workID', updateWork);
worksRouter.delete('/works/:workID', deleteWork);
worksRouter.post('/works/:worksID/link-authors', connectWorkToAuthor);

export default worksRouter;
