import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../../_Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass'],
})
export class RegisterComponent implements OnInit {
  //Constructor
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  //Vars to store what the user is inputting
  private username: string = '';
  private password: string = '';
  private name: string = '';

  ngOnInit(): void {}

  //Getting the user input from the various input boxes
  handleUsername(term: string): void {
    this.username = term.replace(/[<={}()>/\\]/gi, '');
  }
  handlePassword(term: string): void {
    this.password = term.replace(/[<={}()>/\\]/gi, '');
  }
  handleName(term: string): void {
    this.name = term.replace(/[<={}()>/\\]/gi, '');
  }

  //Making sure that the input is valid
  handleRegister() {
    if (this.username == '') {
      window.alert('Please enter an email');
    }
    if (this.password == '') {
      window.alert('Please enter a password');
    }
    if (this.name == '') {
      window.alert('Please enter a name');
    }

    //Ensuring the email is valid
    console.log(this.username, 'is the username');
    // if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(this.username)) {
    //   window.alert('Please enter a valid email');
    // }

    //If everything is valid, the app tries to create the new user
    if (true) {
      //Declaring the headesrs
      const headers = new HttpHeaders({ 'Content-type': 'application/json' });

      //Creating the request object
      const reqObject = {
        username: this.name,
        email: this.username,
        password: this.password,
      };
      this.authService.register(reqObject);
    }
  }
}
