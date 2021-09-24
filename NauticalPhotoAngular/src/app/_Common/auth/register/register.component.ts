import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../../_Services/auth.service';
import { Router } from '@angular/router';
import { Output, EventEmitter } from '@angular/core';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
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

  // Will be used to handle the loading of registering
  public loading = false;

  @Output()
  public changeAuthPage = new EventEmitter();

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

  handleLogin() {
    this.changeAuthPage.emit('login');
  }
  //Making sure that the input is valid
  async handleRegister() {
    this.loading = true;
    let valid = true;
    if (this.username == '') {
      window.alert('Please enter an email');
      valid = false;
    }
    if (this.password == '') {
      window.alert('Please enter a password');
      valid = false;
    }
    if (this.name == '') {
      window.alert('Please enter a name');
      valid = false;
    }

    //Ensuring the email is valid
    console.log(this.username, 'is the username');
    // if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(this.username)) {
    //   window.alert('Please enter a valid email');
    // }

    //If everything is valid, the app tries to create the new user
    if (valid) {
      //Creating the request object
      const reqObject = {
        username: this.name,
        email: this.username,
        password: this.password,
      };
      const registered = await this.authService.register(reqObject);

      // If registration is working, send the user to the login system
      if (registered) {
        this.changeAuthPage.emit('login');
      }

    }
    this.loading = false;
  }
}
