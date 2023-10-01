import {useEffect, useMemo} from "react";
import { observer } from 'mobx-react-lite'
import Post from "../Post";
import Spinner from "../Spinner";
import {PostStore} from "../../modlues/post";
import {FETCH_STATE} from "../../api";
import './PostList.css';

const _PostList = observer(function PostList({ postStore }: { postStore: PostStore }) {
  const { postList, fetctGetPosts, fetchState } = postStore;

  const renderPostList = useMemo(() => {
    if (!postList.length) return;

    return (
      postList.map((row, index) => (
        <Post key={row.id} index={index} {...row} />
      ))
    )
  }, [postList]);

  useEffect(() => {
    fetctGetPosts();
  }, []);

  return (
    <div className="post-list-container">
      {
        fetchState === FETCH_STATE.DONE
          ? renderPostList
          : <Spinner />
      }
    </div>
  )
})

export default _PostList;
