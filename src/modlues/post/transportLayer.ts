import {instnace} from "../../api";
import {IPost, PostListType} from "../../data";

export class TransPortLayer {
  url = {
    post: '/posts'
  }

  constructor() {}

  fetchPostList() {
    return instnace.get<PostListType>(this.url.post)
  }

  savePost(json: IPost) {
    return instnace.post(this.url.post, {
      id: json.id,
      title: json.title,
      content: json.content,
      user: json.user
    });
  }
  deletePost(id: string) {
    console.log(id + '삭제 대상')
  }
}

const transportLayer = new TransPortLayer();

export default transportLayer;
