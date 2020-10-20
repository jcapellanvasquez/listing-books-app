import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {DataService} from '../app-shared/data.service';
import {catchError, map, mergeMap, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {BookActions, BookActionTypes} from './actions';
import {PermissionActions, PermissionActionTypes} from './permission-actions';
import {Permission} from '../models/permission';
import {AuthenticateActions, AuthenticateActionType} from './authenticate-actions';
import {AuthenticateService} from '../authenticate.service';

@Injectable()
export class BookEffect {


  loadBooks$ = createEffect(() => this.actions$.pipe(
    ofType(BookActionTypes.LoadBooks),
    switchMap(
      ({query}) => this.bookService.getBooks(query)
        .pipe(
          map(books => BookActions.loadBooksSuccessAction({books})),
          catchError((err) => {
            return of(BookActions.loadBooksFailureAction({failureMessage: err.message}));
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
            return of(BookActions.loadBookFailureAction({failureMessage: 'carga fallida'}));
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
          return of(BookActions.updateBookFailureAction({failureMessage: error.message}));
        })
      )
    )
  ));

  authenticateUser$ = createEffect(() => this.actions$.pipe(
    ofType(AuthenticateActionType.Authenticate),
    switchMap(
      () => this.authService.authenticate().pipe(
        map(authUser => AuthenticateActions.authenticateSuccessAction({authUser: authUser})),
        catchError(error => of(AuthenticateActions.authenticationFailureAction({failureMessage: error.message})))
      )
    )
  ));

  logoutUser$ = createEffect(() => this.actions$.pipe(
    ofType(AuthenticateActionType.Logout),
    switchMap(
      () => this.authService.logout().pipe(
        map(() => AuthenticateActions.logoutSuccessAction()),
        catchError(error => of(AuthenticateActions.logoutFailureAction({failureMessage: error.message})))
      )
    )
  ));

  constructor(
    private actions$: Actions,
    private bookService: DataService,
    private authService: AuthenticateService
  ) {
  }
}
