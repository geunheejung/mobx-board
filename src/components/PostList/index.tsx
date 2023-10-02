import {useCallback, useEffect, useMemo, useState} from "react";
import { observer } from 'mobx-react-lite'
import Post from "../Post";
import Spinner from "../Spinner";
import {PostStore} from "../../modlues/post";
import {FETCH_STATE} from "../../api";
import './PostList.css';

const PostList = observer(function PostList({ postStore }: { postStore: PostStore }) {
  const { postList, fetctGetPosts, fetchState } = postStore;
  const [error, setError] = useState('');

  const init = async () => {
    try {
      await fetctGetPosts();
    } catch (error) {
      setError('다시 시도해주세요')
    }
  }

  const handleRefresh = useCallback(() => {
    init();
  }, []);

  useEffect(() => {
    init();
  }, []);

  const renderPostList = useMemo(() => {
    if (fetchState === FETCH_STATE.PENDING) return <Spinner />
    if (fetchState === FETCH_STATE.ERROR) return (
      <div>
        <button onClick={handleRefresh}>다시 불러오기</button>
      </div>
    );

    return (
      postList.map((row, index) => (
        <Post key={row.id} index={index} {...row} />
      ))
    )
  }, [postList, fetchState]);

  return (
    <div className="post-list-container">
      {renderPostList}
    </div>
  )
})

export default PostList;
