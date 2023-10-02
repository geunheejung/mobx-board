export interface IPost {
  id: string;
  title: string;
  content: string;
  user: string;
}

export type PostListType = IPost[];
