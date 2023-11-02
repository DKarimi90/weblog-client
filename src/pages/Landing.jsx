import {useEffect} from 'react'
import axios from 'axios'
import { useBlogsContext } from '../hooks/useBlogsContext'
import Blogs from '../components/Blogs'
import BlogForm from '../components/BlogForm'
import BlogSlides from '../components/BlogSlides'
import { useAuthContext } from '../hooks/useAuthContext'


const Landing = () => {
  const {blogs, dispatch} = useBlogsContext()
  const {user} = useAuthContext()
  
  //fetch blogs to load every time component mounts
  useEffect(() => {
    const fetchBlogs = async() => {
      try {
        const response = await axios.get(`https://weblog-server-cbto.onrender.com/blogs`, {

            headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.token}`
        }
        })
        dispatch({type:'SET_BLOGS', payload: response.data})
      } catch(error) {
        console.log(error)
      }
    }
    if(user) {
      fetchBlogs()
    }
  }, [dispatch])


  
  return (
    
    <div className='w-full main min-h-screen'>
      <div className='w-full h-[50vh] mb-10'>
        <BlogSlides blogs={blogs}/>
      </div>
      <div className='grid md:grid-cols-2 gap-4'>
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
