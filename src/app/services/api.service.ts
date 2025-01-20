// api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'  // השירות זמין לכל האפליקציה
})
export class ApiService {

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    // return this.http.get('https://localhost:7023/swagger/index.html');
    
    return this.http.get('http://localhost:7023');

  }
}
