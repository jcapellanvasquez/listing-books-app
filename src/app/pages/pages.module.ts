import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import {AppSharedModule} from '../app-shared/app-shared.module';


@NgModule({
  declarations: [HomeComponent],
    imports: [
        CommonModule,
        PagesRoutingModule,
        AppSharedModule
    ],
})
export class PagesModule { }
