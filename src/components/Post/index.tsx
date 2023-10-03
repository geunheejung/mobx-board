import './Post.css';
import {observer} from "mobx-react-lite";
import {useCallback, useContext} from "react";
import {PostStoreContext} from "../../index";
import {PostStoreType} from "../../modlues/post/type";

interface Props {
  index: number;
  row: PostStoreType;
}

const Post = observer(function Post({ index, row }: Props) {
  const { postStore: { removePost } } = useContext(PostStoreContext)

  const handleRemove = useCallback(() => {
    removePost(row);
  }, []);

  const { title, user, content } = row;
  return (
    <>
      <h1 className="title">{title}</h1>
      <p className="content">{content}</p>
      <p className="meta">작성자 : {user}</p>
      <button onClick={handleRemove}>삭제하기</button>
    </>
  )
});

export default Post;
