import { Router } from 'express';
import * as controllers from '../controller/cardController.js';
import * as schemas from '../schemas/index.js';
import validateSchemasMiddleware from '../middlewares/validateSchemasMiddleware.js';
import jwtValidateMiddleware from '../middlewares/jwtValidateMiddleware.js';

const cardRouter = Router();

cardRouter.post('/insert/card', jwtValidateMiddleware, validateSchemasMiddleware(schemas.createCardSchemaValidate), controllers.createCardController);
cardRouter.get('/cards', jwtValidateMiddleware, controllers.getCardsController);
cardRouter.get('/cards/:id', jwtValidateMiddleware, controllers.getOnlyCardController);
cardRouter.delete('/delete/card/:id', jwtValidateMiddleware, controllers.deleteCardController);

export default cardRouter;