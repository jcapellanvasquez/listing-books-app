import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import {AppSharedModule} from '../app-shared/app-shared.module';
import { FormBookComponent } from './form-book/form-book.component';
import { SingleViewComponent } from './single-view/single-view.component';
import {StoreFeatureModule, StoreModule} from '@ngrx/store';
import {bookReducer} from '../store/reducer';
import {EffectsFeatureModule, EffectsModule} from '@ngrx/effects';
import {BookEffect} from '../store/effects';



@NgModule({
  declarations: [HomeComponent, FormBookComponent, SingleViewComponent],
    imports: [
        CommonModule,
        PagesRoutingModule,
        StoreModule.forFeature('Books', bookReducer),
        EffectsModule.forFeature([BookEffect]),
        AppSharedModule
    ],
})
export class PagesModule { }
