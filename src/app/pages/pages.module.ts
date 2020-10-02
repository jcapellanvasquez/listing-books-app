import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import {AppSharedModule} from '../app-shared/app-shared.module';
import { FormBookComponent } from './form-book/form-book.component';


@NgModule({
  declarations: [HomeComponent, FormBookComponent],
    imports: [
        CommonModule,
        PagesRoutingModule,
        AppSharedModule
    ],
})
export class PagesModule { }
