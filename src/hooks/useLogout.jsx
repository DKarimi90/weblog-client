import { useAuthContext } from "./useAuthContext"

export const useLogout = () => {
    const { dispatch } = useAuthContext()

    const logout = () => {
        //clear user from localstorage 
        localStorage.removeItem('user')


        //update the user context 
        dispatch({type:'LOGOUT'})
    }

    return { logout }
}