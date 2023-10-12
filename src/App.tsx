import React, {useCallback, useState} from "react";
import PostList from './components/PostList';
import Search from './components/Search';
import Modal from './components/Modal';
import PostWriteForm from './components/Form/PostWriteForm';
import "./App.css";
import {observer} from "mobx-react-lite";

const App = observer(function App() {
  const [ isOpen, setIsOpen ] = useState(false);
  const toggleModal = useCallback(() => {
    setIsOpen(prev => !prev);
  }, [isOpen])

  return <div className="App">
    {/* 글쓰기 모달 */}
    <Modal defaultIsOpen={isOpen} onClose={toggleModal}>
      <PostWriteForm afterSubmit={toggleModal} />
    </Modal>
    {/* 게시글 검색 */}
    <Search />
    {/* 게시글 목록 */}
    <PostList />
    
    <button onClick={toggleModal} style={{ position: 'sticky', bottom: 4 }}>글 쓰기</button>
  </div>;
});

export default App;
