import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Book} from '../models/book';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'any'
})
export class DataService {

  constructor(private http: HttpClient) {
  }

  public getBooks(): Observable<Book[]> {
    return this.http.get('assets/books.json').pipe(
      map(
        (data: any[]) => data.map(book => ({...book}))
      )
    );
  }
}
