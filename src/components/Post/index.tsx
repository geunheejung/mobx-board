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

  const { title, user } = row;
  return (
    <div className="post-item-container">
      <span>{index}</span>
      <span>{title}</span>
      <span>{user}</span>
      <button onClick={handleRemove}>삭제하기</button>
    </div>
  )
});

export default Post;
