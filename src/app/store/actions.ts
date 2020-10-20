import {createAction, props} from '@ngrx/store';
import {Book} from '../models/book';
import {Query} from '../models/query';

export enum BookActionTypes {
  LoadBooks = '[Book] Load Books',
  LoadBooksSuccess = '[Book] Load Books Success',
  LoadBooksFailure = '[Book] Load Books Failure',
  LoadBook = '[Book] Load Book',
  LoadBookSuccess = '[Book] Load Book Success',
  LoadBookFailure = '[Book] Load Book Failure',
  LoadPermission = '[Permission] Load Permission',
  LoadPermissionSuccess = '[Permission] Load Permission Success',
  LoadPermissionFailure = '[Permission] Load Permission Failure',
  AddBook = '[Book] Add Book',
  AddBookSuccess = '[Book] Add Book Success',
  AddBookFailure = '[Book] Add Book Failure',
  UpdateBook = '[Book] Update Book',
  UpdateBookSuccess = '[Book] Update Book Success',
  UpdateBookFailure = '[Book] Update Book Failure',
};

export const loadBooksAction = createAction(BookActionTypes.LoadBooks, props<{ query: Query }>());
export const loadBooksSuccessAction = createAction(BookActionTypes.LoadBooksSuccess, props<{ books: Book[] }>());
export const loadBooksFailureAction = createAction(BookActionTypes.LoadBooksFailure, props<{ failureMessage: string }>());
export const loadBookAction = createAction(BookActionTypes.LoadBook, props<{ query: Query }>());
export const loadBookSuccessAction = createAction(BookActionTypes.LoadBookSuccess, props<{ book: Book }>());
export const loadBookFailureAction = createAction(BookActionTypes.LoadBookFailure, props<{ failureMessage: string }>());
export const addBookAction = createAction(BookActionTypes.AddBook, props<{ book: Book }>());
export const addBookSuccessAction = createAction(BookActionTypes.AddBookSuccess, props<{ successMessage: string }>());
export const addBookFailureAction = createAction(BookActionTypes.AddBookFailure, props<{ failureMessage: string }>());
export const updateBookAction = createAction(BookActionTypes.UpdateBook, props<{ book: Book }>());
export const updateBookSuccessAction = createAction(BookActionTypes.UpdateBookSuccess, props<{ successMessage: string }>());
export const updateBookFailureAction = createAction(BookActionTypes.UpdateBookFailure, props<{ failureMessage: string }>());

export const BookActions = {
  loadBooksAction,
  loadBooksSuccessAction,
  loadBooksFailureAction,
  loadBookAction,
  loadBookSuccessAction,
  loadBookFailureAction,
  addBookAction,
  addBookSuccessAction,
  addBookFailureAction,
  updateBookAction,
  updateBookSuccessAction,
  updateBookFailureAction
};
