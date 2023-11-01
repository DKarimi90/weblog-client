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
//     const handleFormSubmit = async(e) => {
//         e.preventDefault()
//         setIsLoading(true)

//         const data = {
//             image: image, 
//             title: title, 
//             author: author, 
//             content: content
//         }

//    const response = await axios.post('https://weblog-server.onrender.com/blogs', data, {
//         headers: {
//             "Authorization": `Bearer ${user.token}`
//         }
//     })
//     dispatch({type:'CREATE_BLOG', payload: response.data})
//     setImage('')
//     setTitle('')
//     setAuthor('')
//     setContent('')
//     setIsLoading(false)
//     navigate('/')
    
//     }


    //use fetch 
    const handleFormSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  const data = {
    image: image,
    title: title,
    author: author,
    content: content,
  };

  try {
    const response = await fetch('https://weblog-server-cbto.onrender.com/blogs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      // Handle errors here, e.g., show an error message.
      console.error('Failed to create a blog:', response.statusText);
    } else {
      const responseData = await response.json();
      dispatch({ type: 'CREATE_BLOG', payload: responseData });
      setImage('');
      setTitle('');
      setAuthor('');
      setContent('');
      setIsLoading(false);
      navigate('/');
    }
  } catch (error) {
    // Handle any network or fetch-related errors here.
    console.error('Fetch error:', error);
  }
};


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
                required
                />
                <input className="input-fields" 
                type='text' 
                placeholder='Blog Title*' 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                />
                <input className="input-fields" 
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
        <div className='bg-[var(--primary)] w-full '>
            {image? <div><img src={image} alt='cover image' className='w-full object-cover'/></div> : <p className='text-6xl text-center pt-6'>Image Will Be Displayed Here</p>}
        </div>.
        <div className='col-span-3'>

         <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    </div>
  )
}

export default BlogForm
