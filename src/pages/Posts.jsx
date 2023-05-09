import React, { useEffect, useRef, useState } from 'react';
import '../components/styles/App.css';
import { getPageCount } from '../utils/pages';
import { useFetching } from '../hoocks/useFetching';
import { usePosts } from '../hoocks/usePosts';
import MyButton from '../components/UI/Button/MyButton';
import MyModal from '../components/MyModal/MyModal';
import Loader from '../components/UI/Loader/Loader';
import Pagination from '../components/UI/pagination/Pagination';
import PostList from '../components/postList';
import PostFilter from '../components/PostFilter';
import PostForm from '../components/UI/PostForm';
import PostService from '../API/PostService';
import { useObserver } from '../hoocks/useObserver';
import MySelect from '../components/UI/Select/MySelect';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: '', query: '' });
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const lastElement = useRef();

  const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
    const response = await PostService.getAll(limit, page);
    setPosts([...posts, ...response.data]);
    const totalCount = response.headers['x-total-count'];
    setTotalPages(getPageCount(totalCount, limit));
  });

  useObserver(lastElement, page < totalPages, isPostsLoading, () => {
    setPage(page + 1);
  });

  useEffect(() => {
    fetchPosts(limit, page);
  }, [page, limit]);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  // Получен post из дочернего компонента
  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  //Меняем номер страницы
  const changePage = (page) => {
    setPage(page);
  };

  return (
    <div className="App">
      <MyButton style={{ marginRight: 10 }} onClick={fetchPosts}>
        GET POST
      </MyButton>

      <MyButton style={{ marginTop: 30 }} onClick={() => setModal(true)}>
        Создать пользователя
      </MyButton>

      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />{' '}
      </MyModal>
      <hr style={{ margin: '15px' }} />

      <PostFilter filter={filter} setFilter={setFilter} />

      <MySelect
        value={limit}
        onChange={(value) => setLimit(value)}
        // defaultValue="Количесвто элементов на странице"
        option={[
          { value: 5, name: '5' },
          { value: 10, name: '10' },
          { value: 15, name: '15' },
          { value: -1, name: 'Показать всё' },
        ]}
      />

      {postError && <h1>Ошибка ${postError}</h1>}

      <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Список постов 1" />
      <div ref={lastElement} style={{ height: 20, background: 'red', paddingTop: 20 }} />
      {isPostsLoading && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}>
          <Loader />
        </div>
      )}

      <Pagination page={page} changePage={changePage} totalPages={totalPages} />
    </div>
  );
}

export default Posts;
