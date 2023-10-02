import {v4 as uuidV4} from "uuid";
import {makeAutoObservable, reaction} from "mobx";
import {IPost} from "../../data";
import {PostListStoreType} from "./type";

export class Post {
  readonly id: string = '';
  title = '';
  content = '';
  user: string = ''; // userStore에서 가져온 User 객체에 대한 참조
  store: PostListStoreType;
  autoSave = true; // Post의 변경사항을 서버에 제출하기 위한 표시
  saveHandler: () => void; // post를 자동저장하는 사이드이펙트의 Disposer;

  constructor(store: any, id = uuidV4()) {
    makeAutoObservable(this, {
      id: false,
      title: false,
      content: false,
      store: false,
      autoSave: false,
      saveHandler: false,
      dispose: false
    });

    this.store = store;
    this.id = id;

    this.saveHandler = reaction(
      () => this.asJson,
      json => {
        if (this.autoSave) {
          this.store.transportLayer.savePost(json);
        }
      }
    )
  }

  delete() {
    this.store.transportLayer.deletePost(this.id);
    this.store.removePost(this);
  }

  get asJson(): IPost {
    return {
      id: this.id,
      title: this.title,
      content: this.content,
      user: this.user || ''
    }
  }

  updateFromJson(json: IPost) {
    this.autoSave = false; // 변경 사항을 서버로 다시 보내는 것을 방지합니다.
    this.title = json.title;
    this.content = json.content;
    this.user = json.user;
    this.autoSave = true;
  }

  dispose() {
    this.saveHandler();
  }
}
