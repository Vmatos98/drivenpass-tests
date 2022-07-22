import { Router } from 'express';
import * as controllers from '../controller/wifiController.js';
import * as schemas from '../schemas/index.js';
import validateSchemasMiddleware from '../middlewares/validateSchemasMiddleware.js';
import jwtValidateMiddleware from '../middlewares/jwtValidateMiddleware.js';

const wifiRouter = Router();

wifiRouter.post('/insert/wifi', jwtValidateMiddleware, validateSchemasMiddleware(schemas.createWifiSchemaValidate), controllers.createWifiController);
wifiRouter.get('/wifi', jwtValidateMiddleware, controllers.getWifiController);
wifiRouter.get('/wifi/:id', jwtValidateMiddleware, controllers.getOnlyWifiController);
wifiRouter.delete('/delete/wifi/:id', jwtValidateMiddleware, controllers.deleteWifiController);

export default wifiRouter;