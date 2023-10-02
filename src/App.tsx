import React, {useCallback, useEffect, useState} from "react";
import PostList from './components/PostList';
import Search from './components/Search';
import Modal from './components/Modal';
import PostWriteForm from './components/Form/PostWriteForm';
import {postStore}  from './modlues/post';
import "./App.css";

function App() {
  const [ isOpen, setIsOpen ] = useState(false);
  const toggleModal = useCallback(() => {
    setIsOpen(prev => !prev);
  }, [isOpen])

  return <div className="App">
    {/* 글쓰기 모달 */}
    <Modal defaultIsOpen={isOpen} onClose={toggleModal}>
      <PostWriteForm afterSubmit={toggleModal} postStore={postStore} />
    </Modal>
    {/* 게시글 검색 */}
    <Search postStore={postStore} />
    {/* 게시글 목록 */}
    <PostList />
    <button onClick={toggleModal}>글 쓰기</button>


  </div>;
}

export default App;
