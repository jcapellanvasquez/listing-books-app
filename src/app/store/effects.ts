import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {DataService} from '../app-shared/data.service';
import {BookActions, BookActionTypes} from './actions';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable()
export class BookEffect {


  loadBooks$ = createEffect(() => this.actions$.pipe(
    ofType(BookActionTypes.LoadBooks),
    mergeMap(
      () => this.bookService.getBooks()
        .pipe(
          map(books => BookActions.loadBooksSuccessAction({books})),
          catchError(() => of(BookActions.loadBooksFailureAction({failureMessage: 'carga fallida'}))),
        )
    )
  ));

  addBook$ = createEffect(() => this.actions$.pipe(
    ofType(BookActionTypes.AddBook),
    mergeMap(
      ({book}) => this.bookService.addBook(book).pipe(
        map(response => BookActions.addBookSuccessAction({successMessage: response.successMessage})),
        catchError((error) => {
          console.log(error);
          return of(BookActions.addBookFailureAction({failureMessage: 'Fallo el salvado'}));
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
