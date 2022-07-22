import { Router } from "express";

import authRoute from "./authRoutes.js";
import credentialRoute from "./credentialRouter.js";
import noteRouter from "./noteRouter.js";
import cardRouter from "./cardRouter.js";
import wifiRouter from "./wifiRouter.js";

const router = Router();
router.use(authRoute);
router.use(credentialRoute);
router.use(noteRouter);
router.use(cardRouter);
router.use(wifiRouter)

export default router;