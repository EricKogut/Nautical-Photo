import { Component, OnInit } from '@angular/core';

import { HttpHeaders, HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { PhotoService } from 'src/app/_Services/photo.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.sass'],
})
export class ExploreComponent implements OnInit {
  constructor(
    private sanitizer: DomSanitizer,
    public http: HttpClient,
    private photoService: PhotoService
  ) {}
  isLoggedIn: Boolean = false;

  public photos: [Object];

  ngOnInit(): void {
    if (localStorage.getItem('id_token')) {
      this.isLoggedIn = true;
      console.log('user is logged in');
    }
    this.photoService.getPublicPhotos().subscribe((response: any) => {
      console.log(response, 'are the public photos');
      this.photos = response.response.message;
      console.log(this.photos, 'are the photos');
    });
  }
}
