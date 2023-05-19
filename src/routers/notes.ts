import express from 'express';
import getErrorMessage from '../helpers/getErrorMessage';
import toNewNotes, { toNewUpdateNotes } from '../helpers/utils';
import notesService from '../services/notesService';
const router = express.Router();

router.get('/', (_req, res) => {
  try {
    res.send(notesService.getNotes());
  } catch (error) {
    res.status(404).send({message: getErrorMessage(error)});
  }
});
router.get('/stats', (_req, res) => {
  try {
    res.send(notesService.getStatus());
  } catch (error) {
    res.status(400).send({message: getErrorMessage(error)});
  }
});
router.get('/:id', (_req, res) => {
  try {
    const id = Number(_req.params.id);
    const note = notesService.getById(id);
    if (note) {
      res.json(note);
    } else {
      res.status(404).send({ error: 'note not find' });
    }
  } catch (error) {
    res.status(500).end();
  }
});
router.delete('/:id', (_req, res) => {
  try {
    const id = Number(_req.params.id);
    notesService.remove(id);
    res.status(204).end();
  } catch (error) {
    res.status(400).send({message: getErrorMessage(error)});
  }
});



router.post('/', (_req , res) => {
  try {
    const newNote = toNewNotes(_req.body);
    const addedNote = notesService.addNote(newNote);
    res.json(addedNote);
  } catch (error) {
    res.status(400).send({message: getErrorMessage(error)});
  }
});

router.patch('/:id', (_req, res) => {
  const id = Number(_req.params.id);

  try {
    const newNote = toNewUpdateNotes(_req.body);
    const updatedNote = notesService.updateNote(id, newNote);
    res.json(updatedNote);
  } catch (error) {
    res.status(400).send({message: getErrorMessage(error)});
  }
});


export default router;