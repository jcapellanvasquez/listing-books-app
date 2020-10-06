import {AppState} from './app-state';
import {Action, createReducer, on} from '@ngrx/store';
import {BookActions, BookActionTypes} from './actions';

export const initialAppState: AppState = {
  books: [],
  errorMessage: '',
  successMessage: ''
};

const appReducer = createReducer(
  initialAppState,
  on(BookActions.loadBooksSuccessAction, (appState,{books}) => ({...appState, books: books})),
  on(BookActions.loadBooksFailureAction, (appState, {errorMessage})=> ({...appState, errorMessage: errorMessage})),
  on(BookActions.addBookSuccessAction, (appState, {successMessage})=> ({...appState, successMessage: successMessage})),
  on(BookActions.addBookFailureAction, (appState, {errorMessage})=> ({...appState, errorMessage: errorMessage})),
);

export function bookReducer(state: AppState | undefined, action: Action) {
  return appReducer(state, action);
}
