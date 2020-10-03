import {Component, OnDestroy, OnInit} from '@angular/core';
import {LazyLoadEvent, SelectItem} from 'primeng/api';
import {DataService} from '../../app-shared/data.service';
import {Observable} from 'rxjs';
import {Book} from '../../models/book';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app-state';
import {BookActions} from '../../store/actions';
import {getBooks} from '../../store/selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public filterOptions: SelectItem[];
  public books$: Observable<Book[]>;
  public books: Book[] = [];
  public rows: Book[] = [];

  constructor(private data: DataService, private store: Store<AppState>) {
    this.filterOptions = [
      {label: 'Más recientes', value: 1},
      {label: 'Menos recientes', value: 2},
      {label: 'A a la Z', value: 3},
      {label: 'Z a la A', value: 4},
    ];
  }

  ngOnInit(): void {
    this.store.dispatch(BookActions.loadBooksAction());
    this.books$ = this.store.select(getBooks);
  }

  lazyLoad(event: LazyLoadEvent) {
    setTimeout(() => {
      let loaded = this.books.slice(event.first, (event.first + event.rows));
      this.rows = [...loaded];
    }, 1000);
  }

}
