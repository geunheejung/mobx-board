import { useEffect } from "react";
import { useRouteMatch } from "react-router-dom";

interface Props {
  // postId: number;
}

const DetailPost = (props: Props) => {
  const match = useRouteMatch();

  const init = async () => {
    try {
      console.log(props, match);
      // const res = await fetchGetPost(postId);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    
    init();

  }, []);

  return (
    <div>
      상세 포스트 페이지
    </div>
  )
}

export default DetailPost;