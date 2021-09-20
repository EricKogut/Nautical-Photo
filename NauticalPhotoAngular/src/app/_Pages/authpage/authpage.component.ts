import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authpage',
  templateUrl: './authpage.component.html',
  styleUrls: ['./authpage.component.sass']
})
export class AuthpageComponent implements OnInit {

  public authType: String = "login";

  constructor() { }

  ngOnInit(): void {
  }

}
