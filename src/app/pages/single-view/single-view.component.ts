import {Component, OnInit} from '@angular/core';
import {AppState} from '../../store/app-state';
import {Store} from '@ngrx/store';
import {getBookById} from '../../store/selectors';
import {Book} from '../../models/book';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-single-view',
  templateUrl: './single-view.component.html',
  styleUrls: ['./single-view.component.css']
})
export class SingleViewComponent implements OnInit {
  public book$: Observable<Book>;

  constructor(private store: Store<AppState>, private activeRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(params => {
      this.book$ = this.store.select(getBookById, {id: params.get('id')});
    });
  }

}
