import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Items } from '../models/Items.model';
// import { GiftManageComponent } from '../compomnents/gift-manage/donor-management/gift-manage.component';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  private apiUrl = 'https://localhost:7023/api/Gift'; // כתובת ה-API שלך

  constructor(private http: HttpClient) {}

  // פונקציה להוספת פריט חדש
  addGift(item: Items): Observable<Items> {
    return this.http.post<Items>(this.apiUrl, item);
  }

  // פונקציה לעדכון פריט
  updateGift(item: Items): Observable<Items> {
    return this.http.put<Items>(`${this.apiUrl}/${item.id}`, item);
  }

  // פונקציה להורדת פריטים
  loadGifts(): Observable<Items[]> {
    return this.http.get<Items[]>(this.apiUrl);
  }

  // פונקציה למחוק פריט
  deleteGift(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
