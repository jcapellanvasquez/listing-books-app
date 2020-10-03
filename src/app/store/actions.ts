import {createAction, props} from '@ngrx/store';
import {Book} from '../models/book';

export enum BookActionTypes {
  LoadBooks = '[Book] Load Books',
  LoadBooksSuccess = '[Book] Load Books Success',
  LoadBooksFailure = '[Book] Load Books Failure',
  AddBook = '[Book] Add Book',
  AddBookSuccess = '[Book] Add Book Success',
  AddBookFailure = '[Book] Add Book Failure',
  UpdateBook = '[Book] Update Book',
  UpdateBookSuccess = '[Book] Update Book Success',
  UpdateBookFailure = '[Book] Update Book Failure',
};

export const loadBooksAction = createAction(BookActionTypes.LoadBooks);
export const loadBooksSucceessAction = createAction(BookActionTypes.LoadBooksSuccess, props<{ books: Book[] }>());
export const loadBooksFailureAction = createAction(BookActionTypes.LoadBooksFailure, props<{ errorMessage: string }>());

export const BookActions = {
  loadBooksAction,
  loadBooksSucceessAction,
  loadBooksFailureAction,
};
