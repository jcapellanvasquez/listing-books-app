import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AppState} from './app-state';

export const getBooksState = createFeatureSelector<AppState>('Books');
export const getBooks = createSelector(getBooksState, appState => appState.books);
export const getBookById = createSelector(getBooksState, (appState, {id}) => appState.books.find(book => book.id == id));
export const getSuccessMessage = createSelector(getBooksState, appState => appState.successMessage);
export const getFailureMessage = createSelector(getBooksState, appState => appState.failureMessage);
