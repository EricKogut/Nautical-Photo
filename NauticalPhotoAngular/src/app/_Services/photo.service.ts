import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Getting the url for the backend
import { environment } from '../../environments/environment';
const baseUrl = environment.backend_url;

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  constructor(private http: HttpClient) {}

  // Getting all the public photos
  getPublicPhotos() {
    return this.http.get(baseUrl + '/photo/get/public');
  }

  // Getting all the photos of a certain user
  getUserPhotos(owner) {
    return this.http.put(baseUrl + '/photo/get/private', {
      owner: owner.email,
      hash: owner.hash,
    });
  }

  // Liking an image with an id
  likeImage(id) {
    return this.http.put(baseUrl + '/photo/like', { id: id });
  }

  // Changing a photo view setting from public to private or vice versa
  togglePublic(id) {
    // Had to add these options as it was complaining (actually, not sure if these are still needed)
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        id: id,
      },
    };
    return this.http.put(baseUrl + '/photo/toggle/public', options);
  }

  // Deleting an image with a certain id
  deleteImage(id) {
    // Had to add these options as it was complaining
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        id: id,
        name: 'test',
      },
    };
    return this.http.delete(baseUrl + '/photo/delete', options);
  }
}
