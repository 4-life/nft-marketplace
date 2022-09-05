export interface Author {
  id?: number;
  name: string;
  avatar?: string;
}

export interface Item {
  id?: number;
  pic?: string;
  author: Author;
  views: number;
  title: string;
  price: string;
  likes: number;
  comments: number;
  publishDate: string;
}

export interface ItemsData {
  items: Item[];
}

export interface ItemsVars {
  range: number;
}
