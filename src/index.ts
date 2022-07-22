import 'express-async-errors';
import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import router from './routes/index.js';
import errorHandler from './middlewares/errorHandlerMiddleware.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(json());
app.use(cors());
app.use(router);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});