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
    const data = new FormData();
    data.append('file', file, file.name);
    console.log(file, 'is what we are sending');
    return this.http.post(baseUrl + '/photo/upload', data);
  }
}
