import './Post.css';

interface Props {
  index: number;
  id: string;
  title: string;
  content: string;
  user: string;
}

function Post({ title, user, index }: Props) {
  return (
    <div className="post-item-container">
      <span>{index}</span>
      <span>{title}</span>
      <span>{user}</span>
    </div>
  )
}

export default Post;
