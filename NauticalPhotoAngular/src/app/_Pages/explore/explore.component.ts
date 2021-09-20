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
  isLoading: Boolean = true;

  public photos: [any];
  public user_photos: [any];
  ngOnInit(): void {
    if (localStorage.getItem('id_token')) {
      this.isLoggedIn = true;
      console.log('user is logged in');
    }
    this.photoService.getPublicPhotos().subscribe((response: any) => {
      console.log(response, 'are the public photos');
      this.photos = response.response.message;
      console.log(this.photos, 'are the photos');
      this.isLoading = false;
    });

    const hash = localStorage.getItem('hash');
    const email = localStorage.getItem('email');

    if (hash && email) {
      this.photoService
        .getUserPhotos({ hash, email })
        .subscribe((response: any) => {
          console.log(response.response.message, 'are the private photos');
          this.user_photos = response.response.message;
        });
    }
  }

  likeImage(photo: any) {
    this.photoService.likeImage(photo._id).subscribe((image) => {
      const index = this.photos.indexOf(photo);
      console.log(this.photos[index].likes);
      this.photos[index].likes += 1;
      console.log(this.photos[index].likes);
    });
  }
}
