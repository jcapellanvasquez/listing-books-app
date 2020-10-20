import {Component, OnInit} from '@angular/core';
import {ConfirmationService, Message, MessageService, PrimeNGConfig} from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'listing-books-app';
  showSideBar: boolean = true;
  constructor(private primeNGConfig: PrimeNGConfig) {
  }

  ngOnInit(): void {
    this.primeNGConfig.ripple = true;
  }
}
