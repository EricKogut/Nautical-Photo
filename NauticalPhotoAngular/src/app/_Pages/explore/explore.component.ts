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
    }
    this.photoService.getPublicPhotos().subscribe((response: any) => {
      this.photos = response.response.message;
      this.isLoading = false;
    });

    const hash = localStorage.getItem('hash');
    const email = localStorage.getItem('email');

    if (hash && email) {
      this.photoService
        .getUserPhotos({ hash, email })
        .subscribe((response: any) => {
          this.user_photos = response.response.message;
        });
    }
  }

  likeImage(photo: any) {
    this.photoService.likeImage(photo._id).subscribe((image) => {
      const index = this.photos.indexOf(photo);
      this.photos[index].likes += 1;
    });
  }

  toggleVisibility(photo: any) {
    this.isLoading = true;
    this.photoService.togglePublic(photo._id).subscribe((image) => {
      const index = this.user_photos.indexOf(photo);
      this.user_photos[index].public = !this.user_photos[index].public;

      const publicIndex = this.photos.indexOf(photo);
      if (publicIndex !== -1) {
        this.photos.splice(publicIndex, 1);
      } else {
        this.photos.push(photo);
      }

      this.isLoading = false;
    });
  }

  deletePhoto(photo: any) {
    this.isLoading = true;
    this.photoService.deleteImage(photo._id).subscribe((image) => {
      const index = this.user_photos.indexOf(photo);
      this.user_photos.splice(index, 1);

      const publicIndex = this.photos.indexOf(photo);
      if (publicIndex !== -1) {
        this.photos.splice(publicIndex, 1);
      }
      this.isLoading = false;
    });
  }

  addPhoto(photo) {
    console.log('added', photo);
    this.photos.unshift(photo);
    this.user_photos.unshift(photo);
  }
}
