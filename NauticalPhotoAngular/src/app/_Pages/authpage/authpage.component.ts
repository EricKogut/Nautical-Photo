import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authpage',
  templateUrl: './authpage.component.html',
  styleUrls: ['./authpage.component.sass'],
})
export class AuthpageComponent implements OnInit {

  // Initial authpage state
  public authType: String = 'login';

  constructor() {}

  // Handling the event emmitter from register or login
  updateAuthPage(event) {
    this.authType = event;
  }

  ngOnInit(): void {}
}
