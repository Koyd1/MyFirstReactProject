import React from 'react';
import PostItem from './postItem';

const PostList = ({ posts, title, remove }) => {
  return (
    <>
      <h1 style={{ textAlign: 'center' }}>{title}</h1>
      {posts &&
        posts.length &&
        posts.map((post, index) => <PostItem remove={remove} number={index + 1} post={post} key={post.id} />)}
    </>
  );
};

export default PostList;
