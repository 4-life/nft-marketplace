export interface Author {
  id?: number;
  name: string;
  avatar: string;
}

export interface Buy {
  id?: number;
  pic: string;
  author: Author;
  views: number;
  title: string;
  price: string;
  likes: number;
  comments: number;
  publishDate: Date;
}
