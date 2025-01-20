import { Routes } from '@angular/router';
// import { ItemListComponent } from './item-list/item-list.component';
// import { DonorListComponent } from './donor-list/donor-list.component';
import { GiftManageComponent } from './compomnents/gift-manage/donor-management/gift-manage.component';
import { DonorManageComponent } from './compomnents/gift-manage/donor-management/donor-management.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: 'gift-manage', component: GiftManageComponent },
  { path: 'donor-manage', component: DonorManageComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent }

];
