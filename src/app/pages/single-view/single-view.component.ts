import {Component, OnInit} from '@angular/core';
import {AppState} from '../../store/app-state';
import {Store} from '@ngrx/store';
import {Book} from '../../models/book';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {loadBookAction} from '../../store/actions';
import {QueryType} from '../../models/query';
import {getSelectedBook} from '../../store/selectors';

@Component({
  selector: 'app-single-view',
  templateUrl: './single-view.component.html',
  styleUrls: ['./single-view.component.css']
})
export class SingleViewComponent implements OnInit {
  public book$: Observable<Book>;

  constructor(private store: Store<AppState>, private activeRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(params => {
      this.store.dispatch(loadBookAction({query: {field:'id',value: params.get('id'), type:QueryType.Filter}}));
      this.book$ = this.store.select(getSelectedBook)
    });
  }

  public gotToEditBook(id: string) {

    this.router.navigate(['/edit', id]);
  }

}
