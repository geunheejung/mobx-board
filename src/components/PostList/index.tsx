import { mockData } from '../../data';
import Post from '../Post';
import {useMemo} from "react";
import './PostList.css';

function PostList() {
  const _postList = useMemo(() => {
    return (
      mockData.map((row, index) => (
        <Post key={row.id} index={index} {...row} />
      ))
    )
  }, [ mockData ])
  return (
    <div className="post-list-container">
      {_postList}
    </div>
  )
}

export default PostList;
