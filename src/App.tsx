import './App.css';
import { useEffect } from "react"
import { useAppDispatch } from './app/hooks';
import { initialNotes } from './reducers/noteReducer';
import notesServices from './services/noteServices';
import useSetNotify from './hooks/useSetNotify';
import CreateNoteBtn from './components/CreateNoteBtn/CreateNoteBtn';
import FormForNoteForm from './components/FormForNote/FormFormNote';
import ToggleArchiveBtn from './components/ToggleArchiveBtn/ToggleArchiveBtn';
import TableInfoHeader from './components/TableInfoHeader/TableInfoHeader';
import TableMainHeader from './components/TableMainHeader/TableMainHeader';
import Table from './components/Table/Table';
import NotifyComponent from './components/NotifyComponent/NotifyComponent';
import TableInfoBody from './components/TableInfoBody/TableInfoBody';
import TableMainBody from './components/TableMainBody/TableMainRowBody ';

function App() {
  const dispatch = useAppDispatch()
  const notify = useSetNotify()
  useEffect(() => {
    async function getNotes() {
      try {
        const notes = await notesServices.getAll()
        dispatch(initialNotes(notes))
      }
      catch (exception) {
        notify({text: exception,type: 'error'})
      }
    }
    getNotes()
  }, [])

  return (
    <div className='App'>
      <header className='App-header'></header>
      <div className="App__container">
        <Table>
          <TableMainHeader />
          <TableMainBody/>
        </Table>

        <CreateNoteBtn />
        <ToggleArchiveBtn />

        <Table>
          <TableInfoHeader />
          <TableInfoBody />
        </Table>

        <FormForNoteForm />
        <NotifyComponent className='' />
      </div>
    </div >
  );
}

export default App;
