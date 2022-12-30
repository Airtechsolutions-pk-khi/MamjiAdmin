import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { User } from '../_models/User';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  public currentUser: Observable<User>;
  private currentUserSubject: BehaviorSubject<User>;
  

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('_autheticatedUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username, password) {
    return this.http.get<any[]>(`api/login/authenticate/${username}/${password}`);
   
  }
  getAllLocations(brandId) {
    return this.http.get<Location[]>(`api/location/all/${brandId}`);
  }
}
