import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import postRootStore, {PostRootStore} from './modlues/post/postRootStore';
import './reset.css';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

export const PostStoreContext = createContext<PostRootStore>(postRootStore);

root.render(
  <React.StrictMode>
    <PostStoreContext.Provider value={postRootStore}>
      <App />
    </PostStoreContext.Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
