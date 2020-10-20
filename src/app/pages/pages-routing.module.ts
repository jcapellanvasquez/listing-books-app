import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {FormBookComponent} from './form-book/form-book.component';
import {SingleViewComponent} from './single-view/single-view.component';
import {SavePermissionGuard} from '../app-shared/save-permission.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'new',
    component: FormBookComponent,
    canActivate: [SavePermissionGuard]
  },
  {
    path: 'book/:id',
    component: SingleViewComponent
  },
  {
    path: 'edit/:id',
    component: FormBookComponent,
    canActivate: [SavePermissionGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}
