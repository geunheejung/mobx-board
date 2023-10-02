import {PostListStore} from "./postListStore";
import {UserStore} from "./userStore";
import {TransPortLayer} from "./transportLayer";

export class PostRootStore {
  userStore: UserStore;
  postStore: PostListStore;

  constructor() {
    this.userStore = new UserStore(this);
    this.postStore = new PostListStore(this, new TransPortLayer());
  }
}

const rootStore = new PostRootStore();

export default rootStore;
