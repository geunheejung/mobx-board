import axios, {HttpStatusCode} from "axios";
import {AxiosResponse} from "axios";
import {IPost, PostListType} from "../data";

export const instnace = axios.create({
  baseURL: 'http://localhost:3001'
});

export const URL = {
  POST: '/posts'
}

export const FETCH_STATE = {
  PENDING: 'PENDING',
  DONE: 'DONE',
  ERROR: 'ERROR'
} as const;

export const posts = {
  get<T = PostListType>(id?: string) {
    if (id) return instnace.get<T>(`${URL.POST}/${id}`);

    return instnace.get<T>(URL.POST);
  },
  post(payload: IPost) {
    return instnace.post(URL.POST, payload);
  },
  delete(id: string) {
    return instnace.delete(`${URL.POST}/${id}`);
  }
}

export type FetchStateKeys = keyof typeof FETCH_STATE;

export type ApiResponse<T = any> = AxiosResponse<T>
