import React, { useState } from 'react';
import './components/styles/App.css';
import PostItem from './components/postItem';
import PostList from './components/postList';


function App() {
  const [posts,setPosts] = useState([
    {id: 1, title: 'Javascript', body: 'Description1'},
    {id: 2, title: 'React', body: 'Description2'},
    {id: 3, title: 'HTML+CSS', body: 'Description3'},

  ])

  return (
    <div className="App">

      <form>
    <input type='text' placeholder='Название поста'></input>
    <input type='text' placeholder='Описание поста'></input>
    <button>Создать пост</button>
      </form>

     <PostList posts={posts} title='Список постов 1'/>

    </div>
  );
}

export default App;