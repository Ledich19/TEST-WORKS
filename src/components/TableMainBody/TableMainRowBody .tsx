import { useAppSelector } from '../../app/hooks'
import TableMainRow from './TableMainRow/TableMainRow'

const TableMainBody = () => {
  const showArchive = useAppSelector(state => state.notes.showArchive)
  const notes = useAppSelector(state => state.notes.notes.filter((n) => n.isArchive === showArchive))
    return (
      <>
        {notes.map((n) => {
          return <TableMainRow key={n.id} note={n} />
        })}</>
    )
  }
  export default TableMainBody