import {FETCH_STATE, FetchStateKeys} from "../../api";
import {makeAutoObservable} from "mobx";

export class PostUiStore {
  fetchState: FetchStateKeys = FETCH_STATE.PENDING;
  fetchSearchState: FetchStateKeys = FETCH_STATE.PENDING;

  constructor() {
    makeAutoObservable(this);
  }
}

export default new PostUiStore();
