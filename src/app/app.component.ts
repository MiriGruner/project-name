import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'; // ייבוא HttpClientModule
import { AuthInterceptor } from './interceptors/auth.interceptor'; // ייבוא ה-Interceptor
import { LoginService } from './Service/login.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HttpClientModule,    // הוספת HttpClientModule
    RouterOutlet, 
    CommonModule, 
    RouterLink, 
    RouterLinkActive
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    LoginService  // הוספת השירות
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
  
  func() {
    alert("hiiiiii");
  }
}
