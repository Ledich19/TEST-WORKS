import express from 'express';
import notesRouter from './routers/notes';

const app = express();
app.use(express.json());

app.use('/notes', notesRouter);

// const unknownEndpoint = (_req, res) => {
//   res.status(404).send({ error: 'unknown endpoint' });
// };
// app.use(unknownEndpoint);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});