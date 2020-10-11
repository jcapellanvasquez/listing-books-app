import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {FormBookComponent} from './form-book/form-book.component';
import {SingleViewComponent} from './single-view/single-view.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'new',
    component: FormBookComponent
  },
  {
    path: 'book/:id',
    component: SingleViewComponent
  },
  {
    path: 'edit/:id',
    component: FormBookComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}
