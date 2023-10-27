import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

//react-quill modules
const Editor = ({content, setContent}) => {
    const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      [{ 'script': 'sub'}, { 'script': 'super' }],  
      ['link', 'image'],
      [{ 'color': [] }, { 'background': [] }], 
      ['clean'],
    ],
  };
 
  return (
    <div>
      <ReactQuill 
          modules={modules}
          theme={'snow'}
          value={content}
          onChange={newValue => setContent(newValue)}
          />
    </div>
  )
}

export default Editor
