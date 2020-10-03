import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AppState} from './app-state';

export const getBooksState = createFeatureSelector<AppState>('Books');
export const getBooks = createSelector(getBooksState, appState => appState.books);