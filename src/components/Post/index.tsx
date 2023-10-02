import './Post.css';
import {observer} from "mobx-react-lite";

interface Props {
  index: number;
  id: string;
  title: string;
  content: string;
  user: string;
}

const Post = observer(function Post({ title, user, index }: Props) {
  return (
    <div className="post-item-container">
      <span>{index}</span>
      <span>{title}</span>
      <span>{user}</span>
    </div>
  )
});

export default Post;
