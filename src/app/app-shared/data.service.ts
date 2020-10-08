import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {forkJoin, from, Observable, of} from 'rxjs';
import {Book} from '../models/book';
import {finalize, map, mergeMap, switchMap, tap} from 'rxjs/operators';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {AngularFireStorage, AngularFireStorageReference} from '@angular/fire/storage';

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
    // Converting Promise to Observable
    const ref = this.refStorage('/images-book/' + book.imageFile.name);
    const task = this.storage.upload('/images-book/' + book.imageFile.name, book.imageFile.file);
    return from(task).pipe(
      switchMap(() => ref.getDownloadURL()),
      map(url => ({...book, img: url})),
      mergeMap((newBook) => {
        return from(this.booksDB.push({
          title: newBook.title,
          author: newBook.author,
          synopsis: newBook.synopsis,
          createdDate: newBook.createdDate,
          likes: 0,
          pages: 0,
          id: '',
          isNew: true,
          img: newBook.img,
          lang: newBook.lang
        })).pipe(map(response => ({successMessage: 'Libro fue creado.'})));
      })
    );
  }

  public taskStorage(file: string, data: any) {
    return this.storage.upload(file, data);
  }

  public refStorage(file: string): AngularFireStorageReference {
    return this.storage.ref(file);
  }

  public getBooks(): Observable<Book[]> {
    return this.booksDB.snapshotChanges().pipe(
      map(changes => changes.map(book => ({
        ...book.payload.val(),
        id: book.key,
        isNew: this.isNew(new Date(book.payload.val().createdDate))
      })))
    );
  }

  public getBook() {

  }

  private isNew(createdDated: Date): boolean {
    let currentDate: Date = new Date();
    let now: number = currentDate.getTime();
    let days: number = 15;
    return (now - createdDated.getTime()) < (this.msPerDay * days);
  }
}
