// import {createContext, useReducer } from 'react'

// //create blogs content
// export const BlogsContext = createContext()

// //define reducer function
// const blogsReducer = (state, action) => {
//     switch(action.type) {
//         case 'SET_BLOGS':
//             return {
//                 blogs: action.payload
//             }
//         case 'CREATE_BLOG':
//             return {
//                 blogs: [action.payload, ...state.blogs]
//             }
//         case 'SET_SINGLE_BLOG':
//             return {
//                     ...state, 
//                     blog: action.payload
//             }
//         case 'DELETE_BLOG':
//             return {
//                 blogs: state.blogs.filter((b) => b._id !== action.payload._id)
//             }
//         default: 
//             return state; 
//     }
// }

// export const BlogsContextProvider = ( {children} ) => {
//     const [state, dispatch] = useReducer(blogsReducer, {
//         blogs: [], 
//         blog: null,
//     })

//     return(
//         <BlogsContext.Provider value={{...state, dispatch}}>
//             {children}
//         </BlogsContext.Provider>
//     )
// }


import { createContext, useReducer } from 'react';

// Create blogs context
export const BlogsContext = createContext();

// Define reducer function
const blogsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_BLOGS':
      return {
        blogs: action.payload,
      };
    case 'CREATE_BLOG':
      return {
        blogs: [action.payload, ...state.blogs],
      };
    case 'SET_SINGLE_BLOG':
      return {
        ...state,
        blog: action.payload,
      };
    case 'DELETE_BLOG':
      return {
        blogs: state.blogs.filter((b) => b._id !== action.payload._id),
      };
    case 'UPDATE_BLOG':
      return {
        blogs: state.blogs.map((blog) =>
          blog._id === action.payload._id ? action.payload : blog
        ),
      };
    default:
      return state;
  }
};

export const BlogsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(blogsReducer, {
    blogs: [],
    blog: null,
  });

  return (
    <BlogsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </BlogsContext.Provider>
  );
};
