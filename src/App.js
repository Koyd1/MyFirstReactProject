import React, {useMemo, useState} from 'react';
import './components/styles/App.css';
import PostList from './components/postList';
import PostForm from './components/UI/PostForm';
import PostFilter from './components/PostFilter';

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: 'Javascript', body: 'Description1' },
    { id: 2, title: 'React', body: 'Description2' },
    { id: 3, title: 'HTML+CSS', body: 'Description3' },
  ]);

const [filter, setFilter] = useState({sort: '', query:''})

const sortedPosts = useMemo( () => {
  console.log('Rita')
  if (filter.sort) {
    return [...posts].sort((a, b) => a [filter.sort].localeCompare(b [filter.sort]))
  }
  return posts;
}, [filter.sort, posts] );

const sortedAndSeachedPosts = useMemo(() =>{
return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query.toLowerCase()))
},[filter.query, sortedPosts])

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  return (
    <div className="App">
      <PostForm create={createPost} />
      <hr style={{ margin: '15px' }} />
      <PostFilter filter={filter} setFilter={setFilter} />
      <PostList remove={removePost} posts={sortedAndSeachedPosts} title="Список постов 1" />
    </div>
  );
}

export default App;
