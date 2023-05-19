import { configureStore } from '@reduxjs/toolkit';
import notesFormReducer from '../reducers/formReducer';
import notesReducer from '../reducers/noteReducer';
import notifyReducer from '../reducers/notifyReducer';

export const store = configureStore({
  reducer: {
    notes: notesReducer,
    notesForm: notesFormReducer,
    notify: notifyReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
