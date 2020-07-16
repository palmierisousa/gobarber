import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';

import routes from './routes';
import uploadConfig from './config/upload';
import AppError from './errors/AppError';

import './database';

const portNumber = 3333;
const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      messsage: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Interval server error',
  });
});

app.listen(portNumber, () => {
  console.log(`🚀 Server started on port ${portNumber}!`);
});
