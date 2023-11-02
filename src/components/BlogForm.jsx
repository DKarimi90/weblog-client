import {useState} from 'react'
import Editor from './Editor'
import axios from 'axios'
import { useBlogsContext } from '../hooks/useBlogsContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'


const BlogForm = () => {
    const [image, setImage] = useState('')
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [content, setContent] = useState('')
    const {blogs, dispatch} = useBlogsContext()
    const [isLoading, setIsLoading] = useState('')
    const {user} = useAuthContext()
    const navigate = useNavigate()

    //submit function 
    const handleFormSubmit = async(e) => {
        e.preventDefault()
        setIsLoading(true)

        const data = {
            image: image, 
            title: title, 
            author: author, 
            content: content
        }

   const response = await axios.post('https://weblog-server-cbto.onrender.com/blogs', data, {
        headers: {
            "Authorization": `Bearer ${user.token}`
        }
    })
    dispatch({type:'CREATE_BLOG', payload: response.data})
    setImage('')
    setTitle('')
    setAuthor('')
    setContent('')
    setIsLoading(false)
    navigate('/')
    
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
    <div className='px-2 main min-h-screen'>
    <div className='w-full grid md:grid-cols-3 gap-3'>
        <div className='md:col-span-2 p-2 border'>
            <form className='flex flex-col' onSubmit={handleFormSubmit}>
                <input className="input-fields" 
                type='file' 
                accept='image/*'
                onChange={handleImageChange}
                required
                />
                <input className="input-fields border " 
                type='text' 
                placeholder='Blog Title*' 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                />
                <input className="input-fields border" 
                type='text' 
                placeholder='Author*' 
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
                />
                <Editor className="input-fields"
                content={content} 
                setContent={setContent}
                />
                <div>
                    <button className='btn' disabled={isLoading}>
                        {isLoading ? 'Posting...' : 'POST BLOG'}
                    </button>
                </div>
            </form>
        </div>
        <div className='border w-full md:relative h-full'>
            {image? <div><img src={image} alt='cover image' className='md:absolute w-full object-cover h-full'/></div> : <p className='text-6xl text-center pt-12 px-4 line-height:[2rem] text-[var(--primary1)]'>Selected Image To Display Here</p>}
        </div>
    </div>
        <div className='col-span-3'>

         <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
  )
}

export default BlogForm
