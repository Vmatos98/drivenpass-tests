import { Router } from 'express';
import * as controllers from '../controller/noteController.js';
import * as schemas from '../schemas/index.js';
import validateSchemasMiddleware from '../middlewares/validateSchemasMiddleware.js';
import jwtValidateMiddleware from '../middlewares/jwtValidateMiddleware.js';

const noteRouter = Router();
noteRouter.post('/insert/note', jwtValidateMiddleware, validateSchemasMiddleware(schemas.createNoteSchemaValidate), controllers.createNoteController);
noteRouter.get('/notes', jwtValidateMiddleware, controllers.getNoteController);
noteRouter.get('/notes/:id', jwtValidateMiddleware, controllers.getOnlyNoteController);
noteRouter.delete('/delete/notes/:id', jwtValidateMiddleware, controllers.deleteNoteController);

export default noteRouter;