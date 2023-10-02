import {useCallback, useContext, useEffect, useMemo, useState} from "react";
import { observer } from 'mobx-react-lite'
import Post from "../Post";
import Spinner from "../Spinner";
import {FETCH_STATE} from "../../api";
import './PostList.css';
import PostStoreContext from "../../context/PostStoreContext";

const PostList = observer(function PostList() {
  const {  postStore: { fetchState, postList }} = useContext(PostStoreContext)

  const [error, setError] = useState('')

  const renderPostList = useMemo(() => {
    if (fetchState === FETCH_STATE.PENDING) return <Spinner />
    if (fetchState === FETCH_STATE.ERROR) return (
      <div>
        <button>다시 불러오기</button>
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
