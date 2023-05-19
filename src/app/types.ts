export interface Note {
  id: string;
  name: string;
  createAt: string;
  category: string;
  content: string;
  isArchive: boolean;
 }
 export interface TableMainRowProps extends Note {
   date: string;
   lastDate: string;
   handleDelete: (event: React.MouseEvent<HTMLButtonElement>, id: string) => void;
   handleUpdate: (event: React.MouseEvent<HTMLButtonElement>, note: Note) => void;
   handleArchive: (event: React.MouseEvent<HTMLButtonElement>, note: Note) => void;
 }
export interface notesFormState {
  form: Note
  isOpen: boolean;
  isUpdate: boolean;
}
export interface TableInfoRowProps {
  category: string;
  all: number;
  archive: number;
}
export interface Notify {
  className: string;
}
export interface NotesState {
  notes: Note[],
  showArchive: boolean,
  err: null | boolean
}
export interface notifyState {
  type: string,
  text: any,
}