import React, { useState} from 'react';
import './components/styles/App.css';
import PostList from './components/postList';
import PostForm from './components/UI/PostForm';
import MySelect from './components/UI/Select/MySelect';
import MyInput from './components/UI/Input/Myinput';

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: 'Javascript', body: 'Description1' },
    { id: 2, title: 'React', body: 'Description2' },
    { id: 3, title: 'HTML+CSS', body: 'Description3' },
  ]);

const [selectedSort, setSelectedSort] = useState('')
const [searchQuery, setSeachQuery] = useState('')

function getSortedPosts() {
  console.log('sssssssss')
  if (selectedSort) {
    return [...posts].sort((a, b) => a [selectedSort].localeCompare(b [selectedSort]))
  }
  return posts;
}

const sortedPosts = getSortedPosts();
  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

const sortPost = (sort) => {
  setSelectedSort(sort);

}

  return (
    <div className='App'>
      <PostForm create={createPost} />
      <hr style={{margin: '15px'}} />
      <div>
        <MyInput
        value={searchQuery}
        onChange={e => setSeachQuery(e.target.value)}
        placeholder='Search...'
        />
        <MySelect 
        value={selectedSort}
        onChange={sortPost}
        defaultValue={'Сортировка'}
        option={[
          {value: 'title', name: 'По названию'},
          {value: 'body', name: 'По описанию'},
        ]}
        />
      </div>
      {posts.length !== 0 ? (
        <PostList remove={removePost} posts={sortedPosts} title='Список постов 1' />
      ) : (
        <h1 style={{ textAlign: 'center' }}> Посты не найдены!</h1> 
        // Когда нет постов
      )}
    </div>
  );
}

export default App;
