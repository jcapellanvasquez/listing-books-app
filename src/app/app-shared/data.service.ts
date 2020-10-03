import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {from, Observable} from 'rxjs';
import {Book} from '../models/book';
import {map} from 'rxjs/operators';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';

@Injectable({
  providedIn: 'any'
})
export class DataService {
  private booksDB: AngularFireList<Book>;
  constructor(private http: HttpClient, private db: AngularFireDatabase) {
    this.booksDB = this.db.list('books');
  }

  public addBook(book: Book)  {
    return this.booksDB.push(book);
  }

  public getBooks(): Observable<Book[]> {
    return this.http.get('assets/books.json').pipe(
      map(
        (data: any[]) => data.map(book => (<Book> {...book}))
      )
    );
  }
}
