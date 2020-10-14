import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {DataService} from '../app-shared/data.service';
import {BookActions, BookActionTypes} from './actions';
import {catchError, map, mergeMap, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable()
export class BookEffect {


  loadBooks$ = createEffect(() => this.actions$.pipe(
    ofType(BookActionTypes.LoadBooks),
    switchMap(
      ({query}) => this.bookService.getBooks(query)
        .pipe(
          map(books => BookActions.loadBooksSuccessAction({books})),
          catchError((err) => {
            return of(BookActions.loadBooksFailureAction({failureMessage: 'carga fallida'}))
          }),
        )
    )
  ));

  loadBook$ = createEffect(() => this.actions$.pipe(
    ofType(BookActionTypes.LoadBook),
    switchMap(
      ({query}) => this.bookService.getBook(query)
        .pipe(
          map(book => BookActions.loadBookSuccessAction({book})),
          catchError((err) => {
            return of(BookActions.loadBookFailureAction({failureMessage: 'carga fallida'}))
          }),
        )
    )
  ));

  addBook$ = createEffect(() => this.actions$.pipe(
    ofType(BookActionTypes.AddBook),
    mergeMap(
      ({book}) => this.bookService.addBook(book).pipe(
        map(response => BookActions.addBookSuccessAction({successMessage: response.successMessage})),
        catchError((error) => {
          return of(BookActions.addBookFailureAction({failureMessage: 'Fallo el salvado'}));
        })
      )
    )
  ));

  updateBook$ = createEffect(() => this.actions$.pipe(
    ofType(BookActionTypes.UpdateBook),
    mergeMap(
      ({book}) => this.bookService.updateBook(book).pipe(
        map(response => BookActions.updateBookSuccessAction({successMessage: response.successMessage})),
        catchError((error) => {
          return of(BookActions.updateBookFailureAction({failureMessage: 'Fallo el salvado'}));
        })
      )
    )
  ));

  constructor(
    private actions$: Actions,
    private bookService: DataService
  ) {
  }
}
