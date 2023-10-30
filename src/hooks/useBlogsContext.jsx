import {useContext} from 'react'
import { BlogsContext } from "../contexts/BlogsContext"

export const useBlogsContext = () => {
    const context = useContext(BlogsContext)

    if(!context) {
         console.log('context cannot be used outside the BlogsContext')
    }
    return context
}