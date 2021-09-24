import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../../_Services/auth.service';
import { Router } from '@angular/router';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {


  // Contructor for the login module
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  // Output to be used to let the auth page know that the user wants to switch to register
  @Output()
  public changeAuthPage = new EventEmitter();

  //This will store what the user has inputted
  private username: string;
  private password: string;

  // Moving the user to register if they click register
  handleRegister() {
    this.changeAuthPage.emit('register');
  }

  // If the user is logged in but they someone find themselves here, they are reroute to the home page
  ngOnInit(): void {
    if (localStorage.getItem('id_token')) {
      this.router.navigate(['']);
    }
  }

  // Getting the user input from the input boxes
  handleUsername(term: string): void {
    this.username = term.replace(/[<={}()>/\\]/gi, '');
  }
  handlePassword(term: string): void {
    this.password = term.replace(/[<={}()>/\\]/gi, '');
  }

  //Handling the input and getting a rsponse
  async handleLogin() {

    //Creatibg the request object
    const reqObject = {
      username: this.username,
      password: this.password,
    };

    //Sending the request to login, awaiting the response
    const result = await this.authService.login(reqObject);

    // If the result returns true, the user is navigating to the landing page
    if (result === true) {
      this.router.navigate(['']);
    }
  }
}
