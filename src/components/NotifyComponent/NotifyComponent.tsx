import './NotifyComponent.scss'
import { FaExclamationTriangle, FaCheckCircle, FaInfoCircle } from 'react-icons/fa'
import { useAppSelector } from '../../app/hooks'
import { Notify } from '../../app/types'

const NotifyComponent   = ({ className }: Notify) => {
  const notifyMessage = useAppSelector(state => state.notify)

  if (!notifyMessage) {
    return null
  }

  return (
    <div className={`notify notify-${notifyMessage.type} ${className}`}>
      <i className={`notify__triangle notify-${notifyMessage.type}`}>
        {notifyMessage.type !== 'error' || <FaExclamationTriangle />}
        {notifyMessage.type !== 'success' || <FaCheckCircle/>}
        {notifyMessage.type !== 'info' || <FaInfoCircle/>}
        {notifyMessage.type !== 'warning' || <FaExclamationTriangle/>}
      </i>
      <div className={`notify__text notify-${notifyMessage.type}`}>
        {/* <span>{notifyMessage.title}</span> */}
        <span>{notifyMessage.text}</span>
      </div>
    </div>
  )
}

export default NotifyComponent