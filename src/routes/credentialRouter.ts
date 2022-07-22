import { Router } from 'express';
import * as controllers from '../controller/credentialController.js';
import * as schemas from '../schemas/index.js';
import validateSchemasMiddleware from '../middlewares/validateSchemasMiddleware.js';
import jwtValidateMiddleware from '../middlewares/jwtValidateMiddleware.js';

const credentialRoute = Router();

credentialRoute.post("/insert/credential", jwtValidateMiddleware, validateSchemasMiddleware(schemas.createCredentialSchemaValidate), controllers.createCredential);
credentialRoute.get("/credential/:id",jwtValidateMiddleware, controllers.getCredentialsById )
credentialRoute.get("/credential", jwtValidateMiddleware, controllers.getCredentials)
credentialRoute.delete("/delete/credential/:id", jwtValidateMiddleware, controllers.deleteCredential)
export default credentialRoute;