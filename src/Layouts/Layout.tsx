import { ReactNode } from "react";
import Search from "~/components/Search";
import PostWriteModal from "~/components/Modal/PostWriteModal";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <header>
        <div className="redirect">
          <button className="redirect-btn">Back</button>          
          <button className="redirect-btn">Next</button>
        </div>
        <div className="logo">
          <img src="" alt="" />
        </div>
      </header>
      <Search />
      {children}
      {/* 글쓰기 모달 */}
      <PostWriteModal /> 
    </div>
  )
}

export default Layout;