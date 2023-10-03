import {posts} from "../../api";
import {IPost} from "../../data";

export class TransPortLayer {
  url = {
    post: '/posts'
  }

  constructor() {}

  fetchPostList() {
    return posts.get();
  }

  savePost(json: IPost) {
    return posts.post(json);
  }
  deletePost(id: string) {
    return posts.delete(id);
  }
}

const transportLayer = new TransPortLayer();

export default transportLayer;
