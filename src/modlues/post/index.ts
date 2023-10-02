import {makeAutoObservable, flow} from 'mobx';
import { v4 as uuidv4 } from 'uuid';
import {AxiosError, isAxiosError} from 'axios';
import {ApiResponse, URL, instnace, FetchStateKeys, FETCH_STATE} from "../../api";
import {PostListType} from "../../data";

interface CreatePostPayload {
  title: string;
  content: string;
  user: string;
}

export class PostStore {
  postList: PostListType = [];
  fetchState: FetchStateKeys = FETCH_STATE.PENDING

  constructor() {
    makeAutoObservable(this, {
      fetctGetPosts: flow.bound,
      fetchCreatePost: flow.bound,
    })
  }

  *fetctGetPosts() {
    this.postList = [];
    this.fetchState = FETCH_STATE.PENDING;
    try {
      const response: ApiResponse<PostListType> = yield instnace.get(URL.POST);
      console.log(response.data);
      this.postList = response.data;
      this.fetchState = FETCH_STATE.DONE;
    } catch (error) {
      console.error(error);
      this.fetchState = FETCH_STATE.ERROR;
      throw error;
    }
  }

  *fetchCreatePost(payload: CreatePostPayload) {
    this.fetchState = FETCH_STATE.PENDING;
    try {
      const response: ApiResponse = yield instnace.post(URL.POST, { id: uuidv4(), ...payload });
      this.fetchState = FETCH_STATE.DONE;
      return response;
    } catch (error: unknown) {
      console.error(error);
      this.fetchState = FETCH_STATE.ERROR;
      throw error;
    }

  }
}

export const postStore = new PostStore();

console.log('postStore.postList ->', postStore.postList);
