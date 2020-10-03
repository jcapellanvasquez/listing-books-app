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
  on(BookActions.loadBooksSucceessAction, (appState,{books}) => ({...appState, books: books}))
);

export function bookReducer(state: AppState | undefined, action: Action) {
  return appReducer(state, action);
}
