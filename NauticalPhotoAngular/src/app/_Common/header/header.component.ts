import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import * as internal from 'events';
import { AuthService } from '../../_Services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  isMenuCollapsed: Boolean = true;

  //Constructor
  constructor(private router: Router, private authService: AuthService) {}

  //Navigating to the main page
  navigateToMain() {
    this.router.navigate(['']);
    this.isMenuCollapsed = true;
  }

  //Sending the user to the logout page after clicking logout button
  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['']);
    window.alert("Logged Out!")
  }

  ngOnInit(): void {
    if (localStorage.getItem('id_token')) {
      this.isLoggedIn = true;
      console.log('user is logged in');
    }
  }
}
