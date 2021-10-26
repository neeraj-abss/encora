import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpRequestService } from './http-request.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

   
  data: any = [];

  isLoggedIn = new BehaviorSubject<boolean>(false);

  private userSubject: BehaviorSubject<any>;

  public user: Observable<any>;


  constructor(private http: HttpClient, private router: Router, private _snackBar: MatSnackBar) {
    this.userSubject = new BehaviorSubject<any>((localStorage.getItem('user')) || '{}');
    this.user = this.userSubject.asObservable();
}

public get userValue() {
  return this.userSubject.value;
}

  login(userid: string) {
    let url = 'https://my-json-server.typicode.com/bokadedarvin/AngularDeveloperSample/users';
    return this.http.get<[]>(url).subscribe(
      user => {
        user.filter((el: any) => {
          if(el.email == userid) {
            localStorage.setItem('user', JSON.stringify(el.firstName + '' + el.lastName));
            this.userSubject.next(el.id);
            this.router.navigate(['/contact']);
            return true;
          }
          this._snackBar.open('Wrong Username or password', 'close');
          return false;
        });
      }
    )          
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['login']);
}
}
