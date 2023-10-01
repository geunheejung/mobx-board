import axios, {HttpStatusCode} from "axios";
import {AxiosResponse} from "axios";

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

export type FetchStateKeys = keyof typeof FETCH_STATE;

export type ApiResponse<T = any> = AxiosResponse<T>
