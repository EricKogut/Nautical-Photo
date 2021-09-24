import { Component, OnInit } from '@angular/core';

import { HttpHeaders, HttpClient } from '@angular/common/http';
import { PhotoService } from 'src/app/_Services/photo.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css'],
})
export class ExploreComponent implements OnInit {
  // Injecting services, http
  constructor(public http: HttpClient, private photoService: PhotoService) {}

  // Variables to hold loading state and if they are logged in
  isLoggedIn: Boolean = false;
  isLoading: Boolean = true;

  // Variables to hold the public photos and the user photos
  public photos: [any]; // public, all general photos
  public user_photos: [any]; // private, user phoots

  ngOnInit(): void {
    // Determining if they are logged in
    if (localStorage.getItem('id_token')) {
      this.isLoggedIn = true;
    }

    // Getting all the public photos
    this.photoService.getPublicPhotos().subscribe((response: any) => {
      this.photos = response.response.message; //LOL wut
      this.isLoading = false;
    });

    // Getting the hashed password and email
    const hash = localStorage.getItem('hash');
    const email = localStorage.getItem('email');

    // The backend verifies that the user requesting the emails has the right password

    // If both exist, it gets the private photos
    if (hash && email) {
      this.photoService
        .getUserPhotos({ hash, email })
        .subscribe((response: any) => {
          this.user_photos = response.response.message;
        });
    }
  }


  // Liking the image
  likeImage(photo: any) {
    this.photoService.likeImage(photo._id).subscribe((image) => {

      // Updating on the frontend
      const index = this.photos.indexOf(photo);
      this.photos[index].likes += 1;
    });
  }

  // Changing a photo from public to private, vice versa
  toggleVisibility(photo: any) {

    // Setting loading state to true
    this.isLoading = true;


    // Sending the request to the backend
    this.photoService.togglePublic(photo._id).subscribe((image) => {

      // Updating the private photos data
      const index = this.user_photos.indexOf(photo);
      this.user_photos[index].public = !this.user_photos[index].public;


      // Updating the public photos data
      const publicIndex = this.photos.findIndex((obj) => obj._id === photo._id);

      // If the photo is there
      if (publicIndex !== -1) {
        // Remove it from the array of photos
        this.photos.splice(publicIndex, 1);
      } else {
        // Otherwise, add it
        this.photos.push(photo);
      }

      // Update the loading state
      this.isLoading = false;
    });
  }

  // Removing a photo from mongo
  deletePhoto(photo: any) {
    this.isLoading = true;
    this.photoService.deleteImage(photo._id).subscribe((image) => {

      // Updating the private photots
      const index = this.user_photos.indexOf(photo);
      this.user_photos.splice(index, 1);


      // Updating public photos
      const publicIndex = this.photos.findIndex((obj) => obj._id === photo._id);
      console.log(publicIndex);
      if (publicIndex !== -1) {
        this.photos.splice(publicIndex, 1);
      }
      this.isLoading = false;
    });
  }

  // Adding photo based on the event emitter in upload handler
  addPhoto(photo) {
    this.photos.unshift(photo);
    this.user_photos.unshift(photo);
  }
}
