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

interface SearchPostPayload {
  keyword: string;
}

export class PostStore {
  postList: PostListType = [];
  filteredList: PostListType = [];
  fetchState: FetchStateKeys = FETCH_STATE.PENDING;
  fetchSearchState: FetchStateKeys = FETCH_STATE.PENDING;

  constructor() {
    makeAutoObservable(this, {
      fetctGetPosts: flow.bound,
      fetchCreatePost: flow.bound,
      fetchSearchPost: flow.bound,
    })
  }

  *fetctGetPosts() {
    this.postList = [];
    this.fetchState = FETCH_STATE.PENDING;
    try {
      const response: ApiResponse<PostListType> = yield instnace.get(URL.POST);
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

  *fetchSearchPost(payload: SearchPostPayload) {
    const { keyword } = payload;

    const params = { title_like: payload.keyword, }
    this.filteredList = [];

    if (!keyword) {
      return;
    }

    this.fetchSearchState = FETCH_STATE.PENDING;
    try {
      const response: ApiResponse<PostListType> = yield instnace.get(
        URL.POST,
        { params }
      );
      this.filteredList = response.data;
      this.fetchSearchState = FETCH_STATE.DONE;
      return response;
    } catch (error: unknown) {
      console.error(error);
      this.fetchSearchState = FETCH_STATE.ERROR;
      throw error;
    }
  }
}

export const postStore = new PostStore();
