import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../../_Services/auth.service';
import { Router } from '@angular/router';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
  //Contructor
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  @Output()
  public changeAuthPage = new EventEmitter();


  //This will store what the user has inputted
  private username: string;
  private password: string;

  //Moving the user to register if they click register
  handleRegister() {
    this.router.navigate(['register']);
  }

  //Init (empty for now)
  ngOnInit(): void {}

  //Getting the user input from the various input boxes
  handleUsername(term: string): void {
    this.username = term.replace(/[<={}()>/\\]/gi, '');
  }
  handlePassword(term: string): void {
    this.password = term.replace(/[<={}()>/\\]/gi, '');
  }

  //Handling the input and getting a rsponse
  handleLogin() {
    const headers = new HttpHeaders({ 'Content-type': 'application/json' });
    //Creatibg the request object
    const reqObject = {
      username: this.username,
      password: this.password,
    };

    //Sneding the request to login
    this.authService.login(reqObject);
  }
}
