import React from 'react';
import { Link } from 'react-router-dom';


const Blogs = ({ blog }) => {
  // Truncate content to a maximum of 150 characters
  function truncate(text, maxLength) {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  }

  // Truncate the blog content
  const truncatedContent = truncate(blog.content, 300);

  return (
    <div className='w-full p-2'>
      <div className='my-2'>
        <p className='font-bold text-3xl'>{blog.title}</p>
      </div>
      <div>
        <Link to={`/blogs/${blog._id}`}>
            <img src={blog.image} alt='cover image' />
        </Link>
      </div>
      <p className='italic'>Author: <span className='font-bold text-[var(--primary)] border-b border-b-[var(--primary)]'>{blog.author}</span></p> 
      <div dangerouslySetInnerHTML={{ __html: truncatedContent }} />
      <Link to={`/blogs/${blog._id}`} className="text-blue-500 hover:underline">
        Read More
      </Link>
    </div>
  );
};

export default Blogs;
