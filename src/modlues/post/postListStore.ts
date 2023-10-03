import {action, computed, flow, makeAutoObservable, observable, runInAction} from "mobx";
import {AxiosResponse} from "axios";
import {IPost, PostListType } from "../../data";
import {PostStoreListType, TransPortLayerType, UserStoreType} from './type';
import {FETCH_STATE, FetchStateKeys} from "../../api";
import {Post} from "./postStore";

export class PostListStore {
  userStore: UserStoreType;
  transportLayer: TransPortLayerType;
  postList: PostStoreListType = [];
  fetchState: FetchStateKeys = FETCH_STATE.PENDING;
  searchKeyword = '';

  constructor(transportLayer: TransPortLayerType, userStore: UserStoreType) {
    makeAutoObservable(this, {
      postList: observable,
      createPost: action.bound,
      removePost: action.bound,
      updatePostFromServer: action.bound,
      loadPostList: flow.bound,
      filteredPostList: computed,
    });
    this.userStore = userStore;
    this.transportLayer = transportLayer;

    this.loadPostList();
  }

  get filteredPostList() {
    if (!this.searchKeyword) return [];
    return this.postList.filter(row => row.title.includes(this.searchKeyword));
  }

  *loadPostList() {
    this.fetchState = FETCH_STATE.PENDING;
    try {
      const res: AxiosResponse<PostListType> = yield this.transportLayer.fetchPostList();
      runInAction(() => {
        res.data.forEach(json => this.updatePostFromServer(json))
        this.fetchState = FETCH_STATE.DONE;
      });
    } catch (error) {
      this.fetchState = FETCH_STATE.ERROR;
    }
  }

  // 서버의 정보로 Post를 업데이트한다. Post가 한 번만 존재함을 보장한다.
  // 새로운 Post를 생성하거나 기존 Post를 업데이트하거나
  // 서버에서 삭제된 Post를 제거할 수 있다.
  updatePostFromServer(json: IPost) {
    let post = this.postList.find(post => post.id === json.id);
    if (!post) {
      post = new Post(this, json.id);
      this.postList.push(post);
    }

    post.updateFromJson(json);
  }

  createPost() {
    const post = new Post(this);
    this.postList.push(post);
    this.loadPostList();
    return post;
  }

  // Post가 어떻게든 삭제되었을 때 클라이언트 메모리에서 삭제한다.
  removePost(post: Post) {
    this.postList.splice(this.postList.indexOf(post), 1);
    post.dispose();
    this.loadPostList();
  }

  setSearchKeyword = (keyword: string) => this.searchKeyword = keyword;
}


