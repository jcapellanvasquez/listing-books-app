import {AppState} from './app-state';
import {Action, createReducer, on} from '@ngrx/store';
import {BookActions, BookActionTypes} from './actions';
import {Query} from '../models/query';

export const initialAppState: AppState = {
  books: [],
  selectedBook: null,
  failureMessage: '',
  successMessage: '',
  isLoad: false,
  query: null
};

const appReducer = createReducer(
  initialAppState,
  on(BookActions.loadBooksAction, (appState)=> ({...appState, failureMessage: '', successMessage: ''})),
  on(BookActions.loadBooksSuccessAction, (appState,{books}) => ({...appState, books: books, successMessage: '', failureMessage: ''})),
  on(BookActions.loadBooksFailureAction, (appState, {failureMessage})=> ({...appState, failureMessage: failureMessage})),
  on(BookActions.loadBookAction, (appState)=> ({...appState, failureMessage: '', successMessage: ''})),
  on(BookActions.loadBookSuccessAction, (appState,{book}) => ({...appState, selectedBook: book, successMessage: '', failureMessage: ''})),
  on(BookActions.loadBookFailureAction, (appState, {failureMessage})=> ({...appState, failureMessage: failureMessage})),
  on(BookActions.addBookAction, (appState)=> ({...appState, successMessage: '', failureMessage: ''})),
  on(BookActions.addBookSuccessAction, (appState, {successMessage})=> ({...appState, successMessage: successMessage})),
  on(BookActions.addBookFailureAction, (appState, {failureMessage})=> ({...appState, failureMessage: failureMessage})),
);

export function bookReducer(state: AppState | undefined, action: Action) {
  return appReducer(state, action);
}
