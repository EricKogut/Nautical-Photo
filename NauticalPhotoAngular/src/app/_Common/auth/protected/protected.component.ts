import { Component, OnInit, ɵConsole } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-protected',
  templateUrl: './protected.component.html',
  styleUrls: ['./protected.component.sass'],
})
export class ProtectedComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router) {}

  /* Vars to store backend string and the message */
  baseURL: String = environment.backend_url;
  message: String;

  /////////////////////////////////////////////////////////////////////
  //only user for testing whether or not a user is properly signed in//
  /////////////////////////////////////////////////////////////////////

  // Execute this HTTP request when the route loads
  ngOnInit() {
    const headers = new HttpHeaders({ Auth: localStorage.getItem('id_token') });
    this.http.get<any>(this.baseURL + '/user/protected').subscribe(
      (response) => {
        if (response) {
          this.message = response.msg;
        }
      },
      (error) => {
        if (error.status === 401) {
          this.message =
            'You are not authorized to visit this route.  No data is displayed.';
        }
        console.log(error);
      },

      () => {
        console.log('HTTP request done');
      }
    );

    //Navigating over to the main page
    this.router.navigate(['main']);
  }
}
