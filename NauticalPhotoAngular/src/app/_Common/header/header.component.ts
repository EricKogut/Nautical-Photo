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

  // Default values for the nav bar
  isLoggedIn: Boolean = false;
  isMenuCollapsed: Boolean = true;

  // Constructor
  constructor(private router: Router, private authService: AuthService) {}

  // Navigating to the main page
  navigateToMain() {
    this.router.navigate(['']);
    this.isMenuCollapsed = true;
  }

  // Toggles whether or not the navbar is collapsed when in mobile mode
  toggleMenuCollapsed() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
   }

  // Sending the user to the homepage after clicking logout button
  logout() {
    // Updating state (local storage)
    this.authService.logout();

    // Updating whether it says login or logout on header
    this.isLoggedIn = false;

    // Routing
    this.router.navigate(['']);

    // Alert
    window.alert('Logged Out!');
  }

  // Setting logged in to true if there is a token in the local storage
  ngOnInit(): void {
    if (localStorage.getItem('id_token')) {
      this.isLoggedIn = true;
    }
  }
}
