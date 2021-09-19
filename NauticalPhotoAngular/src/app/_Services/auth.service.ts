import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Getting the url for the backend
import { environment } from '../../environments/environment';
const baseUrl = environment.backend_url;
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  /*Http Functions  */
  login(request) {
    const headers = new HttpHeaders({ 'Content-type': 'application/json' });

    this.http
      .post(environment.backend_url + '/user/login', request, {
        headers: headers,
      })
      .subscribe(
        // The response data
        (response: any) => {
          console.log(response, 'is the response');
          // If the user authenticates successfully, we need to store the JWT returned in localStorage
          this.setLocalStorage(response.response);
        },
        (error) => {
          //Error if the user is deactivated
          if (error.status == 423) {
            window.alert(
              'Sorry, your account has been deactivaed. Contact a system admin <3'
            );
          }

          //Error if the user has not entered the right usern, password combo
          else if (error.status == 401) {
            window.alert('Sorry, no user with those credentials exists');
          }
        },

        // When observable completes
        () => {
          console.log('done!');
        }
      );
  }

  register(request) {
    const headers = new HttpHeaders({ 'Content-type': 'application/json' });

    //Sending req to backend
    this.http
      .post(environment.backend_url + '/user/register', request, {
        headers: headers,
      })
      .subscribe(
        // The response data
        (response) => {
          window.alert(
            "Success, you are ready to sign in!"
          );
          // If the user authenticates successfully, we need to store the JWT returned in localStorage
          // this.authService.setLocalStorage(response);
        },

        // If there is an error
        (error) => {
          if (error.status == 401) {
            window.alert('Sorry, an account with that email already exists');
          }
        },

        // When observable completes
        () => {
          console.log('done!');
        }
      );
  }

  /////////////////////////////////////////////////////////////////////////////////////////////
  /* Non-Http Functions*/
  setLocalStorage(responseObj) {
    //We receive the JWT and we want to put it in the local storage
    const expiresAt = moment().add(responseObj.expiresIn);
    const currentEmail = responseObj.email;
    const currentHash = responseObj.hash;

    //We need to set the local storea
    //Items are set as ('key', value)
    localStorage.setItem('id_token', responseObj.token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));

    localStorage.setItem('email', currentEmail);
    localStorage.setItem('hash', currentHash);
  }

  //Removing the items from the local storage
  //Angular will look to see if it can find these and if it can't it will tell the user to login again
  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('email');
    localStorage.removeItem('hash');
  }

  //Determining if a user is still logged in based on when their token expries
  public isLoggedIn() {
    //If it returns true, the JWT is valid and we can keep the user logged in
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  //Getting the expiration of a user
  getExpiration() {
    //This is what checks if a user is logged in
    const expiration = localStorage.getItem('expires_at');
    //Making it a JS object
    const expiresAt = JSON.parse(expiration);

    //Calculating the point in time when the JWT expires at
    return moment(expiresAt);
  }
}
