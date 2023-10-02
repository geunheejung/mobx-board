import React, {useCallback, useState} from "react";
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
  {/* 게시글 목록 */}
    <PostList postStore={postStore} />
    <button onClick={toggleModal}>글 쓰기</button>
    <Modal defaultIsOpen={isOpen} onClose={toggleModal}>
      <PostWriteForm afterSubmit={toggleModal} postStore={postStore} />
    </Modal>
  {/* 게시글 검색 */}
    <Search />
  {/* 글쓰기 모달 */}


  </div>;
}

export default App;
