import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputTextModule} from 'primeng/inputtext';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import {RouterModule} from '@angular/router';
import {ButtonModule} from 'primeng/button';


@NgModule({
  declarations: [NavbarComponent, FooterComponent],
  imports: [
    CommonModule,
    InputTextModule,
    RouterModule,
    ButtonModule,
  ],
  exports: [
    InputTextModule,
    NavbarComponent,
    FooterComponent
  ]
})
export class AppSharedModule {
}
