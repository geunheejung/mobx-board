import { makeObservable, makeAutoObservable, flow } from 'mobx';
import {ApiResponse, URL, instnace} from "../../api";
import { mockData } from '../../data'
import {v4 as uuidv4} from "uuid";

interface CreatePostPayload {
  title: string;
  content: string;
  user: string;
}

export class PostStore {
  constructor() {
    makeObservable(this, {
      fetchCreatePost: flow
    }, { autoBind: true })
  }

  *fetchCreatePost(payload: CreatePostPayload) {
    const response: ApiResponse = yield instnace.post(URL.POST, payload);
  }
}

export class PostModel {
  postList = mockData;

  constructor() {
    makeAutoObservable(this);
  }
}

export const postStore = new PostStore();
export const postModel = new PostModel();
