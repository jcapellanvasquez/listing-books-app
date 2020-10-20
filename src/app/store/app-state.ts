import {Book} from '../models/book';
import {Query} from '../models/query';
import {User} from '../models/user';

export interface AppState {
  books: Book[];
  selectedBook: Book,
  isLoad: boolean;
  failureMessage: string;
  successMessage: string;
  query: Query,
  authUser: User
}

