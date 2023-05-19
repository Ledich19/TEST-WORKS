import React from 'react'
import { useAppDispatch } from '../../app/hooks'
import { clearNoteForm, toggleShowNoteForm } from '../../reducers/formReducer'
import Button from '../Button'
import './CreateNoteBtn.scss'

const CreateNoteBtn = () => {
  const dispatch = useAppDispatch()
  const createNoteHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    dispatch(clearNoteForm())
    dispatch(toggleShowNoteForm())
  }
  return (
    <Button name='Create-note' className='create-note-btn' onClick ={ createNoteHandler } />
  )
}

export default CreateNoteBtn