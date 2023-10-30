import React from 'react'

const BlogSlides = ( {blogs} ) => {
  return (
    <div className='w-full h-[50vh] relative'>
      <video src="./videos/web1.mp4" alt="blog image" autoPlay muted loop className='w-full h-full object-cover'/>
      <div className='absolute bg-slate-900/70 w-full h-full top-0'></div>
      <div className='absolute top-0 left-0 right-0 bottom-0 text-center flex justify-center items-center h-full w-full text-[var(--default)] font-bold text-2xl md:text-3xl max-w-[700px] mx-auto flex-col' style={{ lineHeight: '1.5' }}>
        <h1>Discover the Magic of Storytelling at <span>BLOG<span className='text-[var(--primary)]'>BOX</span></span></h1>
        <p>A Community Where Your Stories Come to Life! Join Us and Share Your Unique Tale with the <span className='text-[var(--primary2)]'>World!</span></p>
      </div>
      <div className='flex justify-center pt-5 text-sm md:text-xl px-3'>
        <h1>Explore <strong className='text-[var(--primary2)]'>{blogs.length}</strong> stories already shared on the platform. <span className='text-[var(--primary)]'>Enjoy the READ!</span></h1>
      </div>
    </div>
  )
}

export default BlogSlides
