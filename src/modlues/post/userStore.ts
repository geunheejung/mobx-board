import {v4 as uuidV4} from "uuid";
import {makeAutoObservable} from "mobx";
import {PostRooteStoreType} from "./type";

export class UserStore {
  id = uuidV4()
  email = '';
  name = ''
  rootStore: PostRooteStoreType;

  constructor(rootStore: PostRooteStoreType) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }
}
