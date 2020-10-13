export interface Book {
  id: string;
  title: string;
  synopsis: string;
  likes: number;
  createdDate: Date | string;
  isNew: boolean;
  pages: number;
  author: string;
  img: string;
  imageFile?: ImageFile
  category?: Category;
  lang: string
}

export interface Category {
  id: number;
  title: string;
}

export interface ImageFile {
  name: string;
  file: any;
}
