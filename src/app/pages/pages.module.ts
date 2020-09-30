import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {CardModule} from 'primeng/card';


@NgModule({
  declarations: [HomeComponent],
    imports: [
        CommonModule,
        PagesRoutingModule,
        InputTextModule,
        DropdownModule,
        CardModule
    ],
})
export class PagesModule { }
