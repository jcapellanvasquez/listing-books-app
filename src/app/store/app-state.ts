import {Book} from '../models/book';

export interface AppState {
  books: Book[];
  errorMessage: string;
  successMessage: string;
}

