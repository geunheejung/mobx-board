import {createContext} from "react";
import rootStore, {PostRootStore} from "../modlues/post/postRootStore";

const PostStoreContext = createContext<PostRootStore>(rootStore);

export default PostStoreContext;
