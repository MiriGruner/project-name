import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Register } from '../models/register.model';
import { Login } from '../models/login.model';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  private reloadLoginSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  reloadLogin$: Observable<boolean> = this.reloadLoginSubject.asObservable();

  login(user: Login): Observable<string> {
    let url = "https://localhost:7023/api/Login";
    return this.httpClient.post<string>(url, user);
  }

  register(user:Register): Observable<any>{
    let url="https://localhost:7023/api/Register";
    return this.httpClient.post<any>(url,user)
  }
  setReloadGift() {
    let flag = this.reloadLoginSubject.value;
    this.reloadLoginSubject.next(!flag);
  }
}