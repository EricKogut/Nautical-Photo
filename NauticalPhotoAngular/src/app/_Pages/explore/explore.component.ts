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

  ngOnInit(): void {
    this.someMethod();
  }

  htmlString;
  htmlData;
  someMethod() {
    const headers = new HttpHeaders({
      'Content-Type': 'text/plain',
    });
    const request = this.http
      .get('http://localhost:5000', { headers: headers })
      .subscribe((res) => console.log(res, 'is the response'));

    this.htmlData = this.sanitizer.bypassSecurityTrustHtml(this.htmlString); // this line bypasses angular security
  }
}
