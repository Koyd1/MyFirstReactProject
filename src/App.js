import React, { useState} from 'react';
import './components/styles/App.css';
// import PostItem from './components/postItem';
import PostList from './components/postList';
import PostForm from './components/UI/PostForm';

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: 'Javascript', body: 'Description1' },
    { id: 2, title: 'React', body: 'Description2' },
    { id: 3, title: 'HTML+CSS', body: 'Description3' },
  ]);

  // const bodyInputRef = useRef();
  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  return (
    <div className="App">
      <PostForm create={createPost} />
      {posts.length !== 0 ? (
        <PostList remove={removePost} posts={posts} title="Список постов 1" />
      ) : (
        <h1 style={{ textAlign: 'center' }}> Посты не найдены!</h1>
      )}
    </div>
  );
}

export default App;
