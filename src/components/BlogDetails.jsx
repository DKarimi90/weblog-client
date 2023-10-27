import {useEffect} from 'react'
import { useBlogsContext } from '../hooks/useBlogsContext'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import {formatISO9075} from 'date-fns'

const BlogDetails = () => {
    const { _id } = useParams()
    console.log(_id)
    const { blog, dispatch } = useBlogsContext()

    useEffect(() => {
      const fetchBlog = async() => {
        const response = await axios.get(`http://localhost:4000/blogs/${_id}`)
        dispatch({type:'SET_SINGLE_BLOG', payload: response.data})
        
      }
      fetchBlog()
    }, [_id])
  return (
    <div>
      {blog && ( 
        <div className='w-full p-6'>
          <div className='border-b border-b-black my-2'>
            <p className='font-bold text-3xl'>{blog.title}</p> 
          </div>
          <div><img src={blog.image} alt='cover image'/></div> 
          <p className='italic'>Author: <span className='font-bold text-[var(--primary)] border-b border-b-[var(--primary)]'>{blog.author}</span></p> 
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          <div>
            <p className='flex justify-end'><span className='mr-4'>Published:</span>{formatISO9075(new Date(blog.createdAt))}</p>
          </div>
        </div>
      )
      }
    </div>
  )
}

export default BlogDetails
