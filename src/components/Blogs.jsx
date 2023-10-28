import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {formatDistanceToNow} from 'date-fns'
import { useBlogsContext } from '../hooks/useBlogsContext';
import axios from 'axios'
import {BsTrash3} from 'react-icons/bs'


const Blogs = ({ blog }) => {
  const {blogs, dispatch} = useBlogsContext()
  const [showTrash, setShowTrash] = useState(false)
  // Truncate content to a maximum of 150 characters
  function truncate(text, maxLength) {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '....more';
    }
    return text;
  }

  //hide trash can
  const handleTrash = () => {
    setShowTrash(!showTrash)
  }

  //Delete Blog
  const handleDelete = async () => {
  try {
    await axios.delete(`http://localhost:4000/blogs/${blog._id}`);
    
    // Remove the deleted blog from the local state
    dispatch({ type: 'DELETE_BLOG', payload: { _id: blog._id } });
  } catch (error) {
    console.error('Error deleting blog:', error);
  }
}

  // Truncate the blog content
  const truncatedContent = truncate(blog.content, 300);

  return (
    <div className='w-full p-2 relative'>
      <div className='my-2'>
        <p className='font-bold text-2xl md:text-3xl text-[var(--primary2)]'>{blog.title}</p>
      </div>
      <div>
        <Link to={`/blogs/${blog._id}`}>
          <div className='w-full h-[30vh] mb-2'>
              <img src={blog.image} alt='cover image' className='w-full h-full object-cover' />
          </div>
      <p className='italic text-sm md:text-md'>Author:~ <span className='md:font-bold text-[var(--primary)] border-b border-b-[var(--primary)] my-2'>{blog.author}</span></p> 
      <div dangerouslySetInnerHTML={{ __html: truncatedContent }} className='mb-12 mt-2 text-sm md:text-lg'/>
        </Link>
      </div>
      <div className='w-full flex items-center justify-between absolute bottom-0 p-2' onMouseEnter={handleTrash} onMouseLeave={handleTrash}>
        <div>
          {showTrash? <button onClick={handleDelete}><BsTrash3 className='hover:text-[var(--danger)] animate-bounce'/></button>: ''}
        </div>
         <p className='flex justify-end text-sm md:text-lg pr-4'><span className='mr-2 text-[var(--primary2)]'>Published:</span>  {formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true })}</p>
      </div>
    </div>
  );
};

export default Blogs;
