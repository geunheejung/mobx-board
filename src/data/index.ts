import { v4 as uuidv4 } from 'uuid';

class Post {
  id: string = uuidv4();
  title: string;
  content: string;
  user: string;

  constructor(title: string, content: string, user: string) {
    this.title = title;
    this.content = content;
    this.user = user;
  }
}

const mockData = Array(10).fill(0).map((row, index) => new Post(
  `게시글 제목 ${index}`,
  `게시글 내용 ${index}`,
  `유저 ${index}`)
)

export type PostType = typeof mockData[0];
export type PostListType = PostType[];

export {
  mockData,
}
