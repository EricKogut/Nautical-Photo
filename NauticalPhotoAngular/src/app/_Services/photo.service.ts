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

  getPublicPhotos() {
    return this.http.get(baseUrl + '/photo/get/public');
  }
  getUserPhotos(owner) {
    console.log('getting', {
      owner: owner.email,
      hash: owner.hash,
    });
    return this.http.put(baseUrl + '/photo/get/private', {
      owner: owner.email,
      hash: owner.hash,
    });
  }

  likeImage(id) {
    return this.http.put(baseUrl + '/photo/like', { id: id });
  }
}
