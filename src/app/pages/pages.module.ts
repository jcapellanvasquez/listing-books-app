import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import {AppSharedModule} from '../app-shared/app-shared.module';
import { FormBookComponent } from './form-book/form-book.component';
import { SingleViewComponent } from './single-view/single-view.component';


@NgModule({
  declarations: [HomeComponent, FormBookComponent, SingleViewComponent],
    imports: [
        CommonModule,
        PagesRoutingModule,
        AppSharedModule
    ],
})
export class PagesModule { }
