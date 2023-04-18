import React, {useState,useRef} from 'react'

import MyButton from './Button/MyButton'
import MyInput from './Input/Myinput'

const PostForm = ({create}) => { 
    const [post, setPost] = useState({title: '', body: ''});
    const bodyInputRef = useRef();
    const addNewPost = (e) => {
        e.preventDefault();
        const newPost = {
            ...post, 
            id: Date.now(),
        }
        create(newPost)
        setPost({title: '', body: ''})
    };
    return (
      <form>
        {/* Управляемый уомпонент */}
        <MyInput
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          type="text"
          placeholder="Название поста"
        />

        {/* Неуправляемый\не контролируемый компонент */}
        <MyInput
          value={post.body}
          onChange={(e) => setPost({ ...post, body: e.target.value })}
          ref={bodyInputRef}
          type="text"
          placeholder="Описание поста"
        />
        <MyButton onClick={addNewPost}>Создать пост</MyButton>
      </form>
    );
};

export default PostForm;