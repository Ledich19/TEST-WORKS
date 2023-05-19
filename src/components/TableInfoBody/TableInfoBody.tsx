import { useAppSelector } from '../../app/hooks'

import { Note } from '../../app/types'
import {TableInfoRowProps} from '../../app/types'
import TableInfoRow from './TableInfoRow/TableInfoRow'

const TableInfoBody = () => {
  const notes = useAppSelector(state => state.notes.notes)
  const countNotes = (showCategories: Note[]) => {
    let result: any[] = [];
    for (const note of showCategories) {
      const checkCategory = result.find((n) => n.category === note.category)

      if (checkCategory) {
        const newObject = {
          category: checkCategory.category,
          all: checkCategory.all + 1,
          archive: note.isArchive ? checkCategory.archive + 1 : checkCategory.archive
        }
        result = result.map((c) => c.category === newObject.category ? newObject : c)
      } else {
        const newObject = {
          category: note.category,
          all: 1,
          archive: note.isArchive ? 1 : 0
        }
        result.push(newObject)
      }

    }
    return result
  }
  const dataNotes: TableInfoRowProps[] = countNotes(notes)

  return (
    <>
      {
        dataNotes.map((d) => {
          return <TableInfoRow key={d.category} category={d.category} all={d.all} archive={d.archive} />
        })
      }
    </>
  )
}

export default TableInfoBody