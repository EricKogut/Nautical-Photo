import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import * as internal from 'events';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isAdmin;
  isMenuCollapsed: Boolean = true;

  //Constructor
  constructor(private router: Router) {}

  //Navigating to the main page
  navigateToMain() {
    this.router.navigate(['']);
    this.isMenuCollapsed = true;
  }

  ngOnInit(): void {}
}
