import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputTextModule} from 'primeng/inputtext';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import {RouterModule} from '@angular/router';
import {ButtonModule} from 'primeng/button';
import {HttpClientModule} from '@angular/common/http';
import {DataService} from './data.service';


@NgModule({
  declarations: [NavbarComponent, FooterComponent],
  imports: [
    CommonModule,
    InputTextModule,
    RouterModule,
    ButtonModule,
    HttpClientModule
  ],
  exports: [
    InputTextModule,
    NavbarComponent,
    FooterComponent
  ],
  providers: [DataService]
})
export class AppSharedModule {
}
