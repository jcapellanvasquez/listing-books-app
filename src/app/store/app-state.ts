import {Book} from '../models/book';

export interface AppState {
  books: Book[];
  failureMessage: string;
  successMessage: string;
}

