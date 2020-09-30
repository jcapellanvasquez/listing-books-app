import {Component, OnDestroy, OnInit} from '@angular/core';
import {SelectItem} from 'primeng/api';
import {DataService} from '../../app-shared/data.service';
import {Observable} from 'rxjs';
import {Book} from '../../models/book';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public filterOptions: SelectItem[];
  public books$: Observable<Book[]>;

  constructor(private data: DataService) {
    this.filterOptions = [
      {label: 'Más recientes', value: 1},
      {label: 'Menos recientes', value: 2},
      {label: 'A a la Z', value: 3},
      {label: 'Z a la A', value: 4},
    ];
  }

  ngOnInit(): void {
    this.books$ = this.data.getBooks();
  }

}
