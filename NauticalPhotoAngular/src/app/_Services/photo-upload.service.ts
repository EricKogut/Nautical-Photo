import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Getting the url for the backend
import { environment } from '../../environments/environment';
const baseUrl = environment.backend_url;

@Injectable({
  providedIn: 'root',
})
export class PhotoUploadService {
  constructor(private http: HttpClient) {}

  uploadFile(file) {
    const email = localStorage.getItem('email');
    const hash = localStorage.getItem('hash');
    const data = new FormData();
    data.append('file', file, file.name);
    return this.http.post(baseUrl + '/photo/upload/' + email, data);
  }

  getAllPhotos() {}
}
