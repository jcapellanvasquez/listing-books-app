import {Component, OnInit} from '@angular/core';
import {Message, MessageService, PrimeNGConfig} from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService]
})
export class AppComponent implements OnInit {
  title = 'listing-books-app';

  constructor(private primeNGConfig: PrimeNGConfig) {
  }

  ngOnInit(): void {
    this.primeNGConfig.ripple = true;
  }
}
