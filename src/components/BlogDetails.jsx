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
        <div className='w-full p-6 border-black border-b mb-4'>
          <div className='border-b border-b-black my-2'>
            <p className='font-bold text-2xl md:text-3xl'>{blog.title}</p> 
          </div>
          <div className='h-[50vh]'><img src={blog.image} alt='cover image' className='w-full h-full object-cover'/></div> 
          <p className='italic text-sm md:text-md'>Author: <span className='font-bold text-[var(--primary)] border-b border-b-[var(--primary)]'>{blog.author}</span></p> 
          <div dangerouslySetInnerHTML={{ __html: blog.content }} className='text-sm md:text-lg' style={{lineHeight: '1.5'}}/>
          <div>
            <p className='flex justify-end text-sm md:text-lg'><span className='mr-4'>Published:</span>{formatISO9075(new Date(blog.createdAt))}</p>
          </div>
        </div>
      )
      }
    </div>
  )
}

export default BlogDetails
