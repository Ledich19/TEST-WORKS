import { useAppDispatch } from '../app/hooks'
import {notifyState} from '../app/types'
import { removeNotify, setNotify } from '../reducers/notifyReducer'

const useSetNotify = () => {
  const dispatch = useAppDispatch()
  const setTime = (notify: notifyState) => {
     dispatch(setNotify(notify))
       setTimeout(() => {
         dispatch(removeNotify())
       }, 5000)
  }
  return setTime
}
export default useSetNotify