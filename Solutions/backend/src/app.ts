import express from 'express';
import setupRoutes from './routes';
import { validateEnvVariables } from '@config/validations/env.validation';
import swagger from 'swagger-ui-express';
import docs from '@docs/swagger.json';
import path from 'path';

validateEnvVariables();

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/resources', express.static(path.join(__dirname, 'resources')));
app.use('/docs', swagger.serve, swagger.setup(docs));


setupRoutes(app);

export default app;
