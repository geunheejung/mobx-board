import { observer } from 'mobx-react-lite'
import {postModel} from "../../modlues/post";
import Post from '../Post';
import './PostList.css';

const PostList = observer(function PostList() {
  const { postList } = postModel;
  return (
    <div className="post-list-container">
      {
        postList.map((row, index) => (
          <Post key={row.id} index={index} {...row} />
        ))
      }
    </div>
  )
})

export default PostList;
