import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Donors } from '../models/donor.model';

@Injectable({
  providedIn: 'root',
})
export class DonorServiceService {
  private apiUrl = 'https://localhost:7023/api/Donor';  // כתובת ה-API שלך

  constructor(private http: HttpClient) {}

  // שליפת כל התורמים
  getAll(): Observable<Donors[]> {
    return this.http.get<Donors[]>(this.apiUrl);
  }

  // שליפת תורם לפי מזהה
  getById(id: number): Observable<Donors> {
    return this.http.get<Donors>(`${this.apiUrl}/${id}`);
  }

  // הוספת תורם חדש
  add(donor: Donors): Observable<void> {
    return this.http.post<void>(this.apiUrl, donor);
  }

  // עדכון תורם
  update(donor: Donors): Observable<void> {
    return this.http.put<void>(this.apiUrl, donor);
  }

  // מחיקת תורם
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}?id=${id}`);
  }
}
