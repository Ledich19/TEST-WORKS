import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { notesFormState } from '../app/types'

const initialState: notesFormState = {
  form: {
    id: '',
    name: '',
    createAt: '',
    category: '',
    content: '',
    isArchive: false,
  },
  isOpen: false,
  isUpdate: true,
}

const notesFormSlice = createSlice({
  name: 'notesForm',
  initialState,
  reducers: {
    toggleShowNoteForm(state) {
      return { ...state, isOpen: !state.isOpen }
    },
    clearNoteForm(state) {
      const form = {
        id: '',
        name: '',
        createAt: '',
        category: '',
        content: '',
        isArchive: false,
      }
      return { ...state, form: form , isUpdate: false}
    },
    setUpdateNoteToForm(state, action) {
      return { ...state, form: {...action.payload } , isUpdate: true}
    },
    setNoteForm(state, action) {
      return { ...state, form: action.payload }
    },
    changeName(state, action) {
      return { ...state, form: { ...state.form, name: action.payload } }
    },
    changeCategory(state, action) {
      return { ...state, form: { ...state.form, category: action.payload } }
    },
    changeContent(state, action) {
      return { ...state, form: { ...state.form, content: action.payload } }
    }
  }
})

export const { setNoteForm, changeName, changeCategory, changeContent, toggleShowNoteForm, clearNoteForm, setUpdateNoteToForm } = notesFormSlice.actions
export default notesFormSlice.reducer