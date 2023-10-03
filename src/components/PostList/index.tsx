import { useContext } from "react";
import { observer } from 'mobx-react-lite'
import Post from "../Post";
import Spinner from "../Spinner";
import {FETCH_STATE} from "../../api";
import {PostStoreContext} from "../../index";
import './PostList.css';

const PostList = observer(function PostList() {
  const rootStore = useContext(PostStoreContext);

  const { postStore } = rootStore;

  if (postStore.fetchState === FETCH_STATE.PENDING) return <Spinner />;
  if (postStore.fetchState === FETCH_STATE.ERROR) return (
    <div>
      <button>다시 불러오기</button>
    </div>
  )

  return (
    <div className="post-list-container">
      <ul className="card-container">
      {
        postStore.postList.map((row, index) => (
          <li key={row.id} className="card-item">
            <Post index={index} row={row} />
          </li>
        ))
      }
      </ul>
    </div>
  )
})

export default PostList;
