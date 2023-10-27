import {useEffect} from 'react'
import axios from 'axios'
import { useBlogsContext } from '../hooks/useBlogsContext'
import Blogs from '../components/Blogs'
import BlogForm from '../components/BlogForm'


const Landing = ({url}) => {
  const {blogs, dispatch} = useBlogsContext()
  
  //fetch blogs to load every time component mounts
  useEffect(() => {
    const fetchBlogs = async() => {
      try {
        const response = await axios.get(`${url}/blogs`)
        dispatch({type:'SET_BLOGS', payload: response.data})
      } catch(error) {
        console.log(error)
      }
    }
    fetchBlogs()
  }, [])


  
  return (
    <div className='w-full'>
      <div className='flex'>
      {blogs && blogs.map((blog, index) => (
        <Blogs key={index} blog={blog}/>
      ))}
      </div>
      <div className='mt-10'>
        {/* <BlogForm /> */}
      </div>
    </div>
  )
}

export default Landing
