import React, {useState} from 'react';
import './components/styles/App.css';
import PostList from './components/postList';
import PostForm from './components/UI/PostForm';
import PostFilter from './components/PostFilter';
import MyModal from './components/MyModal/MyModal.jsx';
import MyButton from './components/UI/Button/MyButton';
import { usePosts } from './hoocks/usePost';

function App() {
  const [posts, setPosts] = useState([]);

  
const [filter, setFilter] = useState({sort: '', query:''})
const [modal, setModal] = useState(false);
const sortedAndSeachedPosts = usePosts(posts, filter.sort, filter.query); 

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  // Получен post из дочернего компонента
  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  return (
    <div className="App">
      <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>Создать пользователя</MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />{' '}
      </MyModal>
      <hr style={{ margin: '15px' }} />
      <PostFilter filter={filter} setFilter={setFilter} />
      <PostList remove={removePost} posts={sortedAndSeachedPosts} title="Список постов 1" />
    </div>
  );
}

export default App;
