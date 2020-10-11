import {Component, OnInit} from '@angular/core';
import {LazyLoadEvent, MessageService, SelectItem} from 'primeng/api';
import {DataService} from '../../app-shared/data.service';
import {Observable} from 'rxjs';
import {Book} from '../../models/book';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app-state';
import {BookActions, loadBooksAction} from '../../store/actions';
import {getBooks, getFailureMessage} from '../../store/selectors';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Query, QueryType} from '../../models/query';

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
  public form: FormGroup;

  constructor(private data: DataService, private store: Store<AppState>, private messageService: MessageService, private router: Router, public fb: FormBuilder) {
    this.form = this.fb.group({
      order: [''],
      filter: ['']
    });
    this.filterOptions = [
      {label: 'Más recientes', value: {field: 'createdDate', value: -1}},
      {label: 'Menos recientes', value: {field: 'createdDate', value: 1}},
      {label: 'A a la Z', value: {field: 'title', value: 1}},
      {label: 'Z a la A', value: {field: 'title', value: -1}},
    ];

  }

  ngOnInit(): void {
    this.store.dispatch(BookActions.loadBooksAction({query: this.filterOptions[0].value}));
    this.books$ = this.store.select(getBooks);
    this.store.select(getFailureMessage).subscribe(error => {
      if (error) {
        this.messageService.clear();
        this.messageService.add({severity: 'error', summary: 'Carga de listado de libros', detail: error, life: 1000});
      }
    });
  }

  lazyLoad(event: LazyLoadEvent) {
    setTimeout(() => {
      let loaded = this.books.slice(event.first, (event.first + event.rows));
      this.rows = [...loaded];
    }, 1000);
  }

  public goToBook(id: string) {
    this.router.navigate(['/book', id]);
  }

  public filter() {
    let query: Query = {
      value: (<string> this.form.get('filter').value).toLowerCase(),
      field: 'title',
      type: QueryType.Filter
    };
    this.store.dispatch(loadBooksAction({query}));
  }

  public sort() {
    let query: Query = {...this.form.get('order').value.value, type: QueryType.Sort};
    this.store.dispatch(loadBooksAction({query}));
  }

}
