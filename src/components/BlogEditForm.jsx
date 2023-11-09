import React from 'react';
import Editor from './Editor';



function BlogEditForm({ blog, onClose, onSave }) {
    const [image, setImage] = React.useState(blog.image)
    const [title, setTitle] = React.useState(blog.title)
    const [author, setAuthor] = React.useState(blog.author)
    const [content, setContent] = React.useState(blog.content)


  const handleSubmit = (event) => {
    event.preventDefault();
    onSave({ _id: blog._id, image, title, author, content });


    onClose();
  };

  
  return (
    <div className="absolute top-0 left-0 w-full bg-black bg-opacity-50 flex items-center z-10 border">
      <div className="bg-white dark:bg-gray-900 p-6  w-full">
        <form className='flex flex-col' onSubmit={handleSubmit}>
                <input className="input-fields" 
                type='file' 
                accept='image/*'
                // onChange={handleImageChange}
                // required
                />
                <input className="input-fields border " 
                type='text' 
                placeholder='Blog Title*' 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                // required
                />
                <input className="input-fields border" 
                type='text' 
                placeholder='Author*' 
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                // required
                />
                <Editor className="input-fields"
                content={content} 
                setContent={setContent}
                />
                 <div className="flex justify-end">
            <button
              type="button"
              className="mr-4 px-4 py-2 bg-red-500 text-white rounded-lg mt-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-lg mt-2"
            >
              Save
            </button>
          </div>
            </form>
      </div>
    </div>
  );
}

export default BlogEditForm;




  