
import { BiTrash } from "react-icons/bi";
import { BiArchiveIn } from "react-icons/bi";
import { BiHighlight } from "react-icons/bi";
import { BiArchiveOut } from "react-icons/bi";
import { useAppSelector } from "../../../app/hooks";
import { TableMainRowProps } from '../../../app/types'
import CategoryIcon from "../CategoryIcon/CategoryIcon";

const TableMainRowForm = (props: TableMainRowProps) => {
  const {
    lastDate,
    isArchive,
    name,
    createAt,
    category,
    content,
    date,
    handleDelete,
    handleUpdate,
    handleArchive,
    id } = props
  const showArchive = useAppSelector(state => state.notes.showArchive)
  const note = {
    id, name,
    createAt,
    category,
    content,
    isArchive
  }
  return (
    <div className={`table-main__row row`} >
      <CategoryIcon className='table-main__icon' category={category} />
      <div className="table-main__name">{name}</div>
      <div className="table-main__created">{createAt}</div>
      <div className="table-main__category">{category}</div>
      <div className="table-main__content">{content}</div>
      <div title={lastDate} className="table-main__dates">{date}</div>
      <div className="table-main__buttons">
        <button
          onClick={(e) => handleUpdate(e, note)}
          title='Update'
          className="table-main__upd"><BiHighlight /></button>
        <button
          onClick={(e) => handleArchive(e, note)}
          title='Archive'
          className="table-main__arh">{showArchive ? <BiArchiveOut /> : <BiArchiveIn />}</button>
        <button
          onClick={(e) => handleDelete(e, id)}
          title='Delete'
          className="table-main__del"><BiTrash /></button>
      </div>
    </div>
  )
}

export default TableMainRowForm