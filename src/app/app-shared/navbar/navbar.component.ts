import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {Permission} from '../../models/permission';
import {Store} from '@ngrx/store';
import {AppState, getUserAuth, loadPermission} from '../../store';
import {DialogService} from 'primeng/dynamicdialog';
import {ValidateCodeDialogComponent} from '../validate-code-dialog/validate-code-dialog.component';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase/app';
import {AuthenticateActions} from '../../store/authenticate-actions';
import {MenuItem} from 'primeng/api';
import {Menu} from 'primeng/menu';
import {Observable} from 'rxjs';
import {User} from '../../models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public options: MenuItem[];
  public authUser$: Observable<User>;

  @ViewChild('menu') menu: Menu;

  constructor(private router: Router, private authService: AngularFireAuth, private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.authUser$ = this.store.select(getUserAuth);
    this.options = [
      {label: 'Iniciar sesión', icon: 'pi pi-user', command: () => this.login()},
      {label: 'Agregar nuevo libro', icon: 'pi pi-plus-circle', command: () => this.goToNew()},
      {label: 'Cerrar sesión', icon: 'pi pi-power-off'}
    ];
  }

  goToNew() {
    this.router.navigate(['/new']);
  }

  login() {
    this.store.dispatch(AuthenticateActions.authenticateAction());
  }

}
