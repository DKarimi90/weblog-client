import React from 'react'


const Blogs = ({blog}) => {
  return (
    <div>
      <p>{blog.title}</p> 
      <div><img src={blog.image} alt='cover image'/></div> 
      <p className='italic'>{blog.author}</p> 
      <div dangerouslySetInnerHTML={{ __html: blog.content }} />
    </div>
  )
}

export default Blogs
