import React from 'react'

import './Table.scss'
type Props = {
  children?: React.ReactNode;
};

const Table = ({children}: Props ) => {
  return (
    <div className={``} >
      {children}
    </div>
  )
}

export default Table 