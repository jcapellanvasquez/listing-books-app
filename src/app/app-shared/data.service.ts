import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {forkJoin, from, Observable, of} from 'rxjs';
import {Book, Category, ImageFile} from '../models/book';
import {finalize, map, mergeMap, switchMap, tap} from 'rxjs/operators';
import {AngularFireDatabase, AngularFireList, QueryFn} from '@angular/fire/database';
import {AngularFireStorage, AngularFireStorageReference} from '@angular/fire/storage';
import {Query, QueryType} from '../models/query';
import {redirectUnauthorizedTo} from '@angular/fire/auth-guard';

@Injectable({
  providedIn: 'any'
})
export class DataService {
  private booksDB: AngularFireList<Book>;
  private msPerDay: number = 8600000;

  constructor(private http: HttpClient, private db: AngularFireDatabase, private storage: AngularFireStorage) {
    this.booksDB = this.db.list<Book>('books');
  }

  public addBook(book: Book): Observable<{ successMessage }> {
    return from(this.booksDB.push({
      title: book.title,
      author: book.author,
      synopsis: book.synopsis,
      createdDate: book.createdDate,
      likes: 0,
      pages: 0,
      id: '',
      isNew: true,
      img: book.img,
      lang: book.lang
    })).pipe(
      switchMap(createdBook => {
        const ref = this.refStorage('images-book/' + createdBook.key);
        const task = this.storage.upload('images-book/' + createdBook.key, book.imageFile.file);
        return from(task).pipe(
          switchMap(() => ref.getDownloadURL()),
          map((url) => {
            const taskUpdate = this.booksDB.update(createdBook.key, {
              img: url
            });
            return ({successMessage: 'Libro fue creado.'});
          })
        );
      })
    );
  }

  public updateBook(book: Book): Observable<{ successMessage }> {
    return from(this.booksDB.update(book.id, {
      title: book.title,
      author: book.author,
      synopsis: book.synopsis,
      pages: 0,
      img: book.img,
      lang: book.lang
    })).pipe(
      switchMap(createdBook => {
        if (!book?.imageFile) {
          return of({successMessage: 'Libro fue editado con exito.'});
        }
        const ref = this.refStorage('images-book/' + book.id);
        const task = this.storage.upload('images-book/' + book.id, book.imageFile.file);
        return from(task).pipe(
          switchMap(() => ref.getDownloadURL()),
          map((url) => {
            const taskUpdate = this.booksDB.update(book.id, {
              img: url
            });
            return ({successMessage: 'Libro fue editado con exito.'});
          })

        );
      })
    );
  }


  public taskStorage(file: string, data: any) {
    return this.storage.upload(file, data);
  }

  public refStorage(file: string): AngularFireStorageReference {
    return this.storage.ref(file);
  }

  public getBooks(query: Query): Observable<Book[]> {
    return this.db.list<Book>('books', this.getQueryBooks(query)).snapshotChanges().pipe(
      map(changes => changes.map(book => ({
        ...book.payload.val(),
        id: book.key,
        isNew: this.isNew(new Date(book.payload.val().createdDate))
      }))),
      map(books => {
        if (query) {
          return this.sortBooks(query.field, query.value, books);
        }
        return books;
      }),
    );
  }

  public getBook(query: Query): Observable<Book> {
    return this.db.list<Book>('books', ref => {
      return ref.orderByKey().equalTo(query.value).limitToFirst(1);
    }).snapshotChanges().pipe(
      map(changes => changes.map(book => ({
        ...book.payload.val(),
        id: book.key,
        isNew: this.isNew(new Date(book.payload.val().createdDate))
      }))),
      map(books => {
        return books[0];
      }),
    );
  }


  public getQueryBooks(query: Query): QueryFn {
    return ref => {
      switch (query?.type) {
        case QueryType.Filter: {
          return ref.orderByChild(query.field).startAt(query.value).limitToFirst(1000);
        }
        case QueryType.Sort: {
          return ref.orderByChild(query.field);
        }
        default: {
          return ref;
        }
      }
    };
  }

  public sortBooks(sortField: string, order: number | string, books: Book[]) {
    if (order === 1) {
      return books.sort(this.sortASC(sortField));
    }
    return books.sort(this.sortDESC(sortField));
  }

  public sortASC(sortField: string) {
    return (first, second) => {
      if (first[sortField] > second[sortField]) {
        return 1;
      } else if (first[sortField] < second[sortField]) {
        return -1;
      }
      return 0;
    };
  }

  public sortDESC(sortField: string) {
    return (first, second) => {
      if (first[sortField] < second[sortField]) {
        return 1;
      } else if (first[sortField] > second[sortField]) {
        return -1;
      }
      return 0;
    };
  }

  private isNew(createdDated: Date): boolean {
    let currentDate: Date = new Date();
    let now: number = currentDate.getTime();
    let days: number = 15;
    return (now - createdDated.getTime()) < (this.msPerDay * days);
  }
}
