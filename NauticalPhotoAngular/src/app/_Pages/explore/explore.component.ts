import { Component, OnInit } from '@angular/core';

import { HttpHeaders, HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.sass'],
})
export class ExploreComponent implements OnInit {
  constructor(private sanitizer: DomSanitizer, public http: HttpClient) {}
  isLoggedIn:Boolean = false;

  ngOnInit(): void {
    if (localStorage.getItem('id_token')) {
      this.isLoggedIn = true;
      console.log('user is logged in');
    }
  }

  
}
