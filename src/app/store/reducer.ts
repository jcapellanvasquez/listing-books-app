import {AppState} from './app-state';
import {Action, createReducer, on} from '@ngrx/store';
import {BookActions, BookActionTypes} from './actions';
import {PermissionActions} from './permission-actions';
import {AuthenticateActions, AuthenticateActionType} from './authenticate-actions';

export const initialAppState: AppState = {
  books: [],
  selectedBook: null,
  failureMessage: '',
  successMessage: '',
  isLoad: false,
  query: null,
  authUser: null
};

const appReducer = createReducer(
  initialAppState,
  on(BookActions.loadBooksAction, (appState)=> ({...appState, failureMessage: '', successMessage: ''})),
  on(BookActions.loadBooksSuccessAction, (appState,{books}) => ({...appState, books: books, successMessage: '', failureMessage: ''})),
  on(BookActions.loadBooksFailureAction, (appState, {failureMessage})=> ({...appState, failureMessage: failureMessage})),
  on(BookActions.loadBookAction, (appState)=> ({...appState, failureMessage: '', successMessage: ''})),
  on(BookActions.loadBookSuccessAction, (appState,{book}) => ({...appState, selectedBook: book, successMessage: '', failureMessage: ''})),
  on(BookActions.loadBookFailureAction, (appState, {failureMessage})=> ({...appState, failureMessage: failureMessage})),
  on(BookActions.addBookAction, (appState)=> ({...appState, successMessage: '', failureMessage: '', isLoad: true})),
  on(BookActions.addBookSuccessAction, (appState, {successMessage})=> ({...appState, successMessage: successMessage, isLoad: false})),
  on(BookActions.addBookFailureAction, (appState, {failureMessage})=> ({...appState, failureMessage: failureMessage, isLoad: false})),
  on(BookActions.updateBookAction, (appState)=> ({...appState, successMessage: '', failureMessage: '', isLoad: true})),
  on(BookActions.updateBookSuccessAction, (appState, {successMessage})=> ({...appState, successMessage: successMessage, isLoad: false})),
  on(BookActions.updateBookFailureAction, (appState, {failureMessage})=> ({...appState, failureMessage: failureMessage, isLoad: false})),
  on(AuthenticateActions.authenticateAction, (appState)=> ({...appState, failureMessage: '', successMessage: ''})),
  on(AuthenticateActions.authenticateSuccessAction, (appState,{authUser}) => ({...appState, authUser: authUser, successMessage: '', failureMessage: ''})),
  on(AuthenticateActions.authenticationFailureAction, (appState, {failureMessage})=> ({...appState, failureMessage: failureMessage})),
  on(AuthenticateActions.logoutAction, (appState)=> ({...appState, failureMessage: '', successMessage: ''})),
  on(AuthenticateActions.logoutSuccessAction, (appState) => ({...appState, successMessage: '',authUser: null, failureMessage: ''})),
  on(AuthenticateActions.logoutFailureAction, (appState, {failureMessage})=> ({...appState, failureMessage: failureMessage})),
);

export function bookReducer(state: AppState | undefined, action: Action) {
  return appReducer(state, action);
}
