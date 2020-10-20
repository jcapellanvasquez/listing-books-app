import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputTextModule} from 'primeng/inputtext';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import {RouterModule} from '@angular/router';
import {ButtonModule} from 'primeng/button';
import {HttpClientModule} from '@angular/common/http';
import {DataService} from './data.service';
import {RippleModule} from 'primeng/ripple';
import {DataViewModule} from 'primeng/dataview';
import {DropdownModule} from 'primeng/dropdown';
import {CardModule} from 'primeng/card';
import {VirtualScrollerModule} from 'primeng/virtualscroller';
import {FileUploadModule} from 'primeng/fileupload';
import {MessageModule} from 'primeng/message';
import {MessagesModule} from 'primeng/messages';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToastModule} from 'primeng/toast';
import {RadioButtonModule} from 'primeng/radiobutton';
import {SelectButtonModule} from 'primeng/selectbutton';
import { LongStringPipe } from './long-string.pipe';
import { NotFoundComponent } from './not-found/not-found.component';
import {SidebarModule} from 'primeng/sidebar';
import {DialogModule} from 'primeng/dialog';
import { ValidateCodeDialogComponent } from './validate-code-dialog/validate-code-dialog.component';
import {MenuModule} from 'primeng/menu';


@NgModule({
  declarations: [NavbarComponent, FooterComponent, LongStringPipe, NotFoundComponent, ValidateCodeDialogComponent],
  imports: [
    CommonModule,
    InputTextModule,
    RouterModule,
    ButtonModule,
    HttpClientModule,
    RippleModule,
    InputTextModule,
    DropdownModule,
    CardModule,
    VirtualScrollerModule,
    FileUploadModule,
    MessageModule,
    MessagesModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    RadioButtonModule,
    SelectButtonModule,
    SidebarModule,
    DialogModule,
    MenuModule
  ],
  exports: [
    InputTextModule,
    NavbarComponent,
    FooterComponent,
    RippleModule,
    DataViewModule,
    InputTextModule,
    DropdownModule,
    CardModule,
    VirtualScrollerModule,
    FileUploadModule,
    MessageModule,
    MessagesModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    RadioButtonModule,
    SelectButtonModule,
    LongStringPipe,
    NotFoundComponent,
    SidebarModule,
    MenuModule
  ],
  providers: [DataService]
})
export class AppSharedModule {
}
