import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {Message, MessageService} from 'primeng/api';
import {AppState, getUserAuth} from '../store';
import {Store} from '@ngrx/store';
import {catchError, delay, map, switchMap, tap} from 'rxjs/operators';
import {ValidateCodeDialogComponent} from './validate-code-dialog/validate-code-dialog.component';
import {DialogService} from 'primeng/dynamicdialog';

@Injectable({
  providedIn: 'root'
})
export class SavePermissionGuard implements CanActivate {
  private successMessage: Message = {
    severity: 'success',
    summary: 'Validación exitosa',
    detail: 'Código de validado de manera exitosa.',
    life: 1000
  };
  private failureMessage: Message = {severity: 'warn', summary: 'Acceso denegado', detail: '', life: 1000};

  constructor(
    private store: Store<AppState>,
    private messageService: MessageService,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.select(getUserAuth).pipe(
      switchMap(user => {
        console.log(user);
        if (!user.roles.admin) {
          this.notPermissionMessage();
        }
        return of(user.roles.admin);
      }),
      catchError(() => {
        this.notSessionFoundMessage();
        return of(false);
      })
    );
  }

  private notPermissionMessage() {
    this.messageService.clear();
    this.failureMessage.detail = 'No tienes permiso para acceder a esta ruta.';
    this.messageService.add(this.failureMessage);
  }

  private notSessionFoundMessage() {
    this.messageService.clear();
    this.failureMessage.detail = 'No se ha iniciado sesión.';
    this.messageService.add(this.failureMessage);
  }

}
