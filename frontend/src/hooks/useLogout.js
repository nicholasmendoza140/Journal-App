import { useAuthContext } from "./useAuthContext"
import { useEntriesContext } from "./useEntriesContext"

export const useLogout = () => {
    const {dispatch} = useAuthContext()
    const {dispatch: entriesDispatch} = useEntriesContext()

    const logout = () => {
        localStorage.removeItem('user')
        dispatch({type: 'LOGOUT'})
        entriesDispatch({type: 'SET_ENTRIES', payload: null})
    }

    return {logout}
}