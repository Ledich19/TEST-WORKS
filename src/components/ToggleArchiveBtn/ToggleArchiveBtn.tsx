import React from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { toggleArchive } from '../../reducers/noteReducer'
import Button from '../Button'
import './ToggleArchiveBtn.scss'

const ToggleArchiveBtn = () => {
  const dispatch = useAppDispatch()
  const showArchive = useAppSelector(state => state.notes.showArchive)
  const ToggleArchiveHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    dispatch(toggleArchive())
  }

  return (
    <Button 
    name={showArchive ? 'Show notes' : 'Show archive'} 
    className='toggle-archive-btn' 
    onClick ={ ToggleArchiveHandler } />
  )
}

export default ToggleArchiveBtn
