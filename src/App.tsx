import React from "react";
import PostList from './components/PostList';
import Search from './components/Search';
import Modal from './components/Modal';
import PostWriteForm from './components/Form/PostWriteForm';
import {postStore}  from './modlues/post';
import "./App.css";

function App() {
  return <div className="App">
  {/* 게시글 목록 */}
    <PostList postStore={postStore} />
  {/* 게시글 검색 */}
    <Search />
  {/* 글쓰기 모달 */}
    <PostWriteForm postStore={postStore} />
    {/*<Modal>*/}
    {/*  <PostWriteForm />*/}
    {/*</Modal>*/}
  </div>;
}

export default App;
