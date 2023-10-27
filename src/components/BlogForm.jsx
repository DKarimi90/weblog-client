import {useState} from 'react'
import Editor from './Editor'
import axios from 'axios'
import { useBlogsContext } from '../hooks/useBlogsContext'

const BlogForm = () => {
    const [image, setImage] = useState('')
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [content, setContent] = useState('')
    const {blogs, dispatch} = useBlogsContext()

    //submit function 
    const handleFormSubmit = async(e) => {
        e.preventDefault()

        const data = {
            image: image, 
            title: title, 
            author: author, 
            content: content
        }

   const response = await axios.post('http://localhost:4000/blogs', data, {
        headers: {
            "Content-Type": "application/json"
        }
    })
    dispatch({type:'CREATE_BLOG', payload: response.data})
    setImage('')
    setTitle('')
    setAuthor('')
    setContent('')
    }

    //submit image 
    const handleImageChange = (e) => {
        e.preventDefault()
        const file = e.target.files[0]

        viewImage(file)
    }

    //convert to base64
    const viewImage = (file) => {
        const reader = new FileReader()

        if(file) {
            reader.readAsDataURL(file)
            reader.onloadend = () => {
                setImage(reader.result)
            }
        }
    }
  return (
    <div className='w-full grid md:grid-cols-3 gap-3'>
        <div className='col-span-2 bg-[var(--primary)] p-2'>
            <form className='flex flex-col' onSubmit={handleFormSubmit}>
                <input className="input-fields" 
                type='file' 
                accept='image/*'
                onChange={handleImageChange}
                />
                <input className="input-fields" 
                type='text' 
                placeholder='Blog Title*' 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                />
                <input className="input-fields" 
                type='text' 
                placeholder='Author*' 
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                />
                <Editor className="input-fields"
                content={content} 
                setContent={setContent}
                />
                <div>
                    <button className='btn'>Post Blog</button>
                </div>
            </form>
        </div>
        <div className='bg-[var(--primary)] w-full '>
            {image? <div><img src={image} alt='cover image' className='w-full object-cover'/></div> : <p className='text-6xl text-center pt-6'>Image Will Be Displayed Here</p>}
        </div>
         <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  )
}

export default BlogForm