import {createContext, useReducer} from 'react'

export const AuthContext = createContext()

//define user reducer 
const authReducer = (state, action) => {
    switch(action.type) {
        case 'LOGIN':
            return {
                user: action.payload
            }
        case 'LOGOUT':
            return {
                user: null
            }
        default: 
            state
    }
}

//create and export auth context provider
export const AuthContextProvider = ( {children} ) => {
    const [state, dispatch] = useReducer(authReducer, {
        users: [],
        user: null
    })

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}