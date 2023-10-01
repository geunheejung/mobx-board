import axios, {HttpStatusCode} from "axios";
import {AxiosResponse} from "axios";

export const instnace = axios.create({
  baseURL: 'http://localhost:8080'
});

export const URL = {
  POST: '/post'
}

export interface Response<T = any> {
  data: T;
  message: string;
  status: typeof HttpStatusCode;
}

export type ApiResponse<T = any> = AxiosResponse<Response<T>>
