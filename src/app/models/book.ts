export interface Book {
  id: string;
  title: string;
  description: string;
  likes: number;
  createdDate: Date;
  isNew: boolean;
  pages: number;
  author: string;
  img: string;
  category?: Category;
}

export interface Category {
  id: number;
  title: string;
}
