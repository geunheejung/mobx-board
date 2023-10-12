import { useCallback, useState } from "react";
import Modal from "..";
import PostWriteForm from "../../Form/PostWriteForm";

const PostWriteModal = () => {
  const [ isOpen, setIsOpen ] = useState(false);
  const toggleModal = useCallback(() => {
    setIsOpen(prev => !prev);
  }, [isOpen])
  
  return (
    <>
      <button onClick={toggleModal} style={{ position: 'sticky', bottom: 4 }}>글 쓰기</button>
    
      <Modal defaultIsOpen={isOpen} onClose={toggleModal}>
        <PostWriteForm afterSubmit={toggleModal} />
      </Modal>
    </>
  )
}

export default PostWriteModal;