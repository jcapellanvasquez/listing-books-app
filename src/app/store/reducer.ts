import {AppState} from './app-state';
import {Action, createReducer, on} from '@ngrx/store';
import {BookActions, BookActionTypes} from './actions';

export const initialAppState: AppState = {
  books: [],
  failureMessage: '',
  successMessage: ''
};

const appReducer = createReducer(
  initialAppState,
  on(BookActions.loadBooksSuccessAction, (appState,{books}) => ({...appState, books: books, successMessage: '', failureMessage: ''})),
  on(BookActions.loadBooksFailureAction, (appState, {failureMessage})=> ({...appState, failureMessage: failureMessage})),
  on(BookActions.addBookSuccessAction, (appState, {successMessage})=> ({...appState, successMessage: successMessage})),
  on(BookActions.addBookFailureAction, (appState, {failureMessage})=> ({...appState, failureMessage: failureMessage})),
);

export function bookReducer(state: AppState | undefined, action: Action) {
  return appReducer(state, action);
}
