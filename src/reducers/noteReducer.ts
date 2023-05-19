import { createSlice } from '@reduxjs/toolkit'
import { NotesState } from '../app/types'

const initialState: NotesState = {
  notes: [],
  showArchive: false,
  err: null
}

const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    initialNotes(state, action) {
      return { ...state, notes: action.payload }
    },
    deleteNote(state, action) {
      const notes = state.notes.filter((n) => n.id !== action.payload)
      return { ...state, notes: notes }
    },
    updateNotesAll(state, action) {
      const notes = state.notes.map((n) => {
        return { ...n, isArchive: !action.payload }
      })
      return { ...state, notes: notes }
    },
    updateNote(state, action) {
      const notes = state.notes.map((n) => n.id === action.payload.id ? action.payload : n)
      return { ...state, notes: notes }
    },
    appendNote(state, action) {
      return { ...state, notes: state.notes.concat(action.payload) }
    },
    toggleArchive(state) {
      return { ...state, showArchive: !state.showArchive }
    }
  }
})

export const { initialNotes, toggleArchive, deleteNote, updateNote, appendNote, updateNotesAll } = noteSlice.actions
export default noteSlice.reducer