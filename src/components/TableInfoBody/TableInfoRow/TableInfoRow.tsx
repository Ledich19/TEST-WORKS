import './TableInfoRow.scss'
import {TableInfoRowProps} from '../../../app/types'


const TableInfoRow = ({ category, all, archive }: TableInfoRowProps) => {
  return (
    <div className='table-info__row row' >
      <div className="able-info__category">{category}</div>
      <div className="able-info__active">{all - archive}</div>
      <div className="able-info__archived">{archive}</div>
    </div>
  )
}

export default TableInfoRow