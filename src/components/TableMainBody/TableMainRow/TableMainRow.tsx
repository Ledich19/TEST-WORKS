import { useAppDispatch } from '../../../app/hooks';
import { setUpdateNoteToForm, toggleShowNoteForm } from '../../../reducers/formReducer';
import { deleteNote, updateNote } from '../../../reducers/noteReducer';
import notesServices from '../../../services/noteServices';
import './TableMainRow.scss'
import TableMainRowForm from './TableMainRowForm'
import { Note } from '../../../app/types'
import useSetNotify from '../../../hooks/useSetNotify';

const TableMainRow = ({ note }:{note: Note } ) => {
  const regex = /(0?[1-9]|[12][0-9]|3[01])[/\-.](0?[1-9]|1[012])[/\-.]\d{4}|\d{4}[/\-.](0?[1-9]|1[012])[/\-.](3[01]|[12][0-9]|0?[1-9])/g
  const dates = note.content.match(regex)
  const date = dates ? dates.join() : ''
  const lastDate = dates ? dates[dates.length - 1] : ''
  const dispatch = useAppDispatch()
  const notify = useSetNotify()
  const createAt = new Date(note.createAt).toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', })

  const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>, id: string) => {
    event.preventDefault()
    try {
      const ask = confirm('Do you want to delete a note ?')
      if (ask) {
        await notesServices.deleteNote(id)
        dispatch(deleteNote(id))
      }
    }
    catch (exception) {
      notify({text: exception,type: 'error'})
    }
  };
  const handleUpdate = (event: React.MouseEvent<HTMLButtonElement>, note: Note) => {
    event.preventDefault()
    const noteInfo = {
      id: note.id,
      name: note.name,
      createAt: note.createAt,
      category: note.category,
      content: note.content,
      isArchive: note.isArchive
    }
    dispatch(toggleShowNoteForm())
    dispatch(setUpdateNoteToForm(noteInfo))
  };
  const handleArchive = async (event: React.MouseEvent<HTMLButtonElement>, note: Note) => {
    event.preventDefault()
    try {
      const newNote = {
        ...note, isArchive: !note.isArchive
      }
      const updatedNote = await notesServices.updateNote(newNote)
      dispatch(updateNote(updatedNote))
    }
    catch (exception) {
      notify({text: exception,type: 'error'})
    }
  };

  return (
    <TableMainRowForm
      handleDelete={handleDelete}
      handleUpdate={handleUpdate}
      handleArchive={handleArchive}
      name={note.name}
      createAt={createAt}
      category={note.category}
      content={note.content}
      date={date}
      id={note.id}
      lastDate={lastDate}
      isArchive={note.isArchive}
    />
  )
}

export default TableMainRow