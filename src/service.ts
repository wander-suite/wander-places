import express, { Request, Response, ErrorRequestHandler, Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

const PORT = 3000;
const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

if (process.env.NODE_ENV == 'production') {
  app.use('/dist', express.static(path.join(__dirname, '../dist')));

  app.get('/', (req: Request, res: Response) => {
    return res.status(200).sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

// catch-all route handler for any requests to an unknown route
app.use((req: Request, res: Response) => res.status(404).send('Error: Page not found'));

// express error handler

const errorRequestHandler: ErrorRequestHandler = (err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
};

app.use(errorRequestHandler);

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});
