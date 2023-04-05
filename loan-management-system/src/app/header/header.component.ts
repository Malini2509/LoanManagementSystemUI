import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor( private userAuthService: UserAuthService,
    private router: Router,
    public userService: UserService) {
  }

   islogged: boolean = false;

   public logedIn(){
    if (this.userAuthService.isLoggedIn() != null) {
      this.islogged = true;
    }else {
      this.islogged = false;
    }
    return this.islogged;
   }
  
  public logout() {
    this.userAuthService.clear();
    this.router.navigate(['/home']);
  }
  navigateToAboutUs(){
    this.router.navigate(['about-us']);
  }
}