import React from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { changeName, changeContent, changeCategory, toggleShowNoteForm } from '../../reducers/formReducer'
import { appendNote, updateNote } from '../../reducers/noteReducer'
import notesServices from '../../services/noteServices'
import useSetNotify from '../../hooks/useSetNotify'
import './FormForNote.scss'

const FormForNoteForm = () => {
  const { form, isUpdate, isOpen } = useAppSelector(state => state.notesForm)
  const dispatch = useAppDispatch()
  const notify = useSetNotify()
  const visibleForm = { display: isOpen ? '' : 'none' }
  const handlerClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    dispatch(toggleShowNoteForm())
  }

  const handleSave = async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!form.content || !form.name) {
      notify({ text: 'name and content and content must contain text', type: 'error' })
    } else if (form.name.length < 3) {
      notify({ type: 'error', text: 'name must be more than 3  letters' })
    }
    else {
      event.preventDefault()
      try {
        const note = {
          name: form.name,
          createAt: new Date().toString(),
          category: form.category ? form.category : 'Random Thought',
          content: form.content,
          isArchive: false,
          id: `${new Date()}${form.content}`,
        }
        const newNote = await notesServices.addNote(note)
        dispatch(appendNote(newNote))
        dispatch(toggleShowNoteForm())

      }
      catch (exception) {
        notify({ text: exception, type: 'error' })
      }
    }
  }

  const handleUpdate = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    try {
      const note = {
        ...form
      }
      const newNote = await notesServices.updateNote(note)
      dispatch(updateNote(newNote))

      dispatch(toggleShowNoteForm())

    }
    catch (exception) {
      notify({ text: exception, type: 'error' })
    }
  }

  return (
    <div style={visibleForm} className='form-wrapper hide'  >
      <form id='note-form' method='post' action='#'>
        <span>Name: </span>
        <input onChange={(e) => dispatch(changeName(e.target.value))}
          value={form.name} type='text' id='note-form-name' name='name' />

        <span>Category: </span>
        <select onChange={(e) => dispatch(changeCategory(e.target.value))}
          value={form.category} id='note-form-category' name='category' >
          <option value='Random Thought'>Random Thought</option>
          <option value='Idea'>Idea</option>
          <option value='Task'>Task</option>
        </select>

        <span>Note: </span>
        <textarea
          onChange={(e) => dispatch(changeContent(e.target.value))}
          value={form.content} name='content' id='note-form-content'>
        </textarea>

        {
          isUpdate ?
            <button onClick={handleUpdate} type='button' className='hide' id='save-note'>update</button>
            : <button onClick={handleSave} type='button' className='hide' id='save-note'>save</button>
        }
        <button onClick={handlerClose} id='close-form' type='button'>close</button>
      </form>
    </div>
  )
}

export default FormForNoteForm