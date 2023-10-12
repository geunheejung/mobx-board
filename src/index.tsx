import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
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
    <BrowserRouter
      getUserConfirmation={(message, callback) => {
        console.log(message);
        const allowTransition = window.confirm(message);
        callback(allowTransition)
      }}
    >
      <PostStoreContext.Provider value={postRootStore}>
        <App />
      </PostStoreContext.Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
