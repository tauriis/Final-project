export interface Post {
  _id: string;
  title: string;
  content: string;
  userId: {
    _id: string;
    username: string;
  };
  createdAt: string | null;
  views: number;
  likes: string[];
  dislikes: string[];
  comments: Comment[];
  tags: string[];
}

export interface Comment {
  _id: string;
  text: string;
  username: string;
  userId: string;
  likes: string[];
  dislikes: string[];
  createdAt: string | null;
}
