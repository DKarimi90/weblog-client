import { useState } from "react"
import { useAuthContext } from "./useAuthContext"

export const useLogin = () => {
    const { dispatch } = useAuthContext()
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const login = async(email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('http://localhost:4000/users/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify({email, password})
        })

        const json = await response.json()
        if(!response.ok){
            setError(json.error)
            setIsLoading(false)
        }
        if(response.ok){
            //store user in local storage 
            localStorage.setItem('user', JSON.stringify(json))

            //update user context
            dispatch({type:'LOGIN', payload: json})
            setIsLoading(false)
        }
    }

    return { login, error, isLoading }
}