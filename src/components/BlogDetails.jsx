import {useEffect, useState} from 'react'
import { useBlogsContext } from '../hooks/useBlogsContext'
import { Navigate, useParams } from 'react-router-dom'
import axios from 'axios'
import {formatISO9075} from 'date-fns'
import { useAuthContext } from '../hooks/useAuthContext'
import BlogEditForm from './BlogEditForm';
import {FiEdit} from 'react-icons/fi'
import { Helmet } from 'react-helmet-async'

const BlogDetails = ( {url} ) => {
    const [selectedBlog, setSelectedBlog] = useState(null);
    const { _id } = useParams()
    console.log(_id)
    const { blogs, blog, dispatch } = useBlogsContext()
    const { user } = useAuthContext()
    

    useEffect(() => {
      const fetchBlog = async() => {
        const response = await axios.get(`https://weblog-server-cbto.onrender.com/blogs/${_id}`, {
          headers: {
          "Authorization": `Bearer ${user.token}`
        }
        })
        dispatch({type:'SET_SINGLE_BLOG', payload: response.data})
        
      }
      if(user){
        fetchBlog()
      } else {
        return <Navigate to="/login" />
      }
    }, [_id, blogs])


  //update blog
  const handleEditClick = (blog) => {
    setSelectedBlog(blog);
  };

  const handleFormClose = () => {
    setSelectedBlog(null);
  };

  const handleFormSave = async (updatedBlog) => {
    if (updatedBlog._id) {
      try {
        const response = await axios.patch(
          `https://weblog-server-cbto.onrender.com/blogs/${updatedBlog._id}`,
          updatedBlog,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`,
            },
          }
        );

        if (response.status === 200) {
          dispatch({ type: 'UPDATE_BLOG', payload: updatedBlog });
        } else {
          console.error('Failed to update article');
        }
      } catch (err) {
        console.error(err.message);
      }
    } else {
      console.error('Invalid updatedBlog._id');
    }
  };

  return (
    <div className='w-full relative'>
      <Helmet>
        {blog && <title>{blog.title}</title>}
      </Helmet>
      <div className='main min-h-screen pt-16'>
        {blog && ( 
          <div className='w-full p-6 '>
            <div className='border-b border-b-black my-2'>
              <p className='font-bold text-2xl md:text-3xl'>{blog.title}</p> 
            </div>
            <div className='h-[50vh]'><img src={blog.image} alt='cover image' className='w-full h-full object-cover'/></div> 
            <p className='italic text-sm md:text-md'>Author: <span className='font-bold text-[var(--primary)] border-b border-b-[var(--primary)]'>{blog.author}</span></p> 
            <div dangerouslySetInnerHTML={{ __html: blog.content }} className='text-sm md:text-lg' style={{lineHeight: '1.5'}}/>
            <div>
              <p className='flex justify-end text-sm md:text-lg'><span className='mr-4 text-[var(--primary2)]'>Published:</span>{formatISO9075(new Date(blog.createdAt))}</p>
            </div>
          </div>
        )
        }
              {selectedBlog && (
          <BlogEditForm
            blog={selectedBlog}
            onClose={handleFormClose}
            onSave={handleFormSave}
          />
        )}
      </div>
      <div className='fixed bottom-0 xl:top-[15vh] xl:right-[15%]' onClick={() => window.scrollTo(0,0)}>
        <button className='hover:text-[var(--primary2)] ' onClick={() => handleEditClick(blog)}>
              <FiEdit size={30}/>
        </button>
      </div>
    </div>
  )
}

export default BlogDetails
