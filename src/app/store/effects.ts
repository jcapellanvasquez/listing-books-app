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
          map(books => BookActions.loadBooksSucceessAction({books})),
          catchError(() => of(BookActions.loadBooksFailureAction({errorMessage: 'carga fallida'}))),
        )
    )
  ));

  constructor(
    private actions$: Actions,
    private bookService: DataService
  ) {
  }
}
