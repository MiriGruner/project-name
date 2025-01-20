import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { ItemsService } from '../Service/Items.service';
import { Items } from '../models/Items.model';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GiftManageComponent } from '../compomnents/gift-manage/donor-management/gift-manage.component';
import { MessageService } from 'primeng/api'; 
@Component({
  selector: 'app-item-list',
  standalone: true, 
  imports: [CommonModule, 
    TableModule,
    ButtonModule], 
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  
  displayedColumns: string[] = ['name', 'price', 'donor', 'delete', 'update'];

  items: Items[] = [];

  constructor(private itemsService: ItemsService) {}

  ngOnInit(): void {
    // מנוי על ה-Observable שמוחזר מהשירות
    this.itemsService.loadGifts().subscribe((items: Items[]) => {
      this.items = items;
      console.log(this.items);
    });
  }

  updateItem(item: Items) {
    // הגדרת פעולה לעדכון פריט
    // כאן תוכל לקרוא לפונקציה של עריכת המתנה כמו שמופיע בקוד הקודם
  }

  deleteItem(item: Items) {
    // הגדרת פעולה למחיקת פריט
    this.itemsService.deleteGift(item.id).subscribe(() => {
      // פעולה שמבצע לאחר מחיקת המתנה, לדוגמה טעינת המתנות מחדש
      this.itemsService.loadGifts().subscribe((items: Items[]) => {
        this.items = items;
      });
    });
  }
}
