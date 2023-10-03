import { useContext, useMemo, useState} from "react";
import { observer } from 'mobx-react-lite'
import {computed, trace} from 'mobx';
import Post from "../Post";
import Spinner from "../Spinner";
import {FETCH_STATE} from "../../api";
import {PostStoreContext} from "../../index";
import './PostList.css';
const PostList = observer(function PostList() {
  const rootStore = useContext(PostStoreContext);

  const { postStore } = rootStore;

  // mobx store의 변경 사항이 올바르게 반영 되지 않음.
  const renderPostList = useMemo(() => {
    if (postStore.fetchState === FETCH_STATE.PENDING) return computed(() => <Spinner />)
    if (postStore.fetchState === FETCH_STATE.ERROR) return computed(() => (
      <div>
        <button>다시 불러오기</button>
      </div>
    ))

    return computed(() => (
      postStore.postList.map((row, index) => (
        <Post key={row.id} index={index} {...row} />
      ))
    ))
  }, [postStore.postList, postStore.fetchState]).get();


  return (
    <div className="post-list-container">
      {renderPostList}
    </div>
  )
})

export default PostList;
