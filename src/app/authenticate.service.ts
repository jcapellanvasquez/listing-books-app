import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase} from '@angular/fire/database';
import {from, Observable, of} from 'rxjs';
import {User} from './models/user';
import {catchError, map, switchMap, take, tap} from 'rxjs/operators';
import {auth} from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  constructor(private authService: AngularFireAuth, private db: AngularFireDatabase) {
  }

  public authenticate(): Observable<User | null> {
    return this.authService.authState.pipe(
      switchMap(authUser => {
        if (authUser) {
          return this.updateUser(this.mapUser(authUser));
        }
        return from(this.authService.signInWithPopup(new auth.GoogleAuthProvider())).pipe(
          switchMap(authUser => {
            return this.updateUser(this.mapUser(authUser.user));
          })
        );
      })
    );
  }

  private updateUser(user: User): Observable<any> {
    let userRef = this.db.object(`users/${user.id}`);
    userRef.update(user);
    return userRef.valueChanges();
  }

  private mapUser(data: any): User {
    return {
      name: data['displayName'] || '',
      email: data['email'],
      photoURL: data['photoURL'],
      id: data['uid'],
      roles: {reader: true} //default value
    };
  }
}
