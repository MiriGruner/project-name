import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ItemListComponent } from './item-list/item-list.component';
import { DonorListComponent } from './donor-list/donor-list.component';
import { CommonModule } from '@angular/common';
import { DonorManageComponent } from './compomnents/gift-manage/donor-management/donor-management.component';
import { GiftManageComponent } from './compomnents/gift-manage/donor-management/gift-manage.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule, RouterLink, RouterLinkActive], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
   func(){
    alert("hiiiiii")
   }
}




