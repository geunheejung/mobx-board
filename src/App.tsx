import { observer } from "mobx-react-lite";
import { Switch, Route } from "react-router-dom";
import Layout from "~/Layouts/Layout";
import Home from '~/pages/Home';
import DetailPost from '~/pages/DetailPost';
import "./App.css";

const App = observer(function App() {
  return (
    <div className="App">
      {/* 게시글 검색 */}
      <Layout>
        <Switch>
          <Route exact path='/'>
            {/* 게시글 목록 */}
            <Home />
          </Route>
          <Route path='/:postId'>
            <DetailPost />
          </Route>
          <Route>
            <div>
              Not Found404
            </div>
          </Route>
        </Switch>
      </Layout>
    </div>
  );
});

export default App;
