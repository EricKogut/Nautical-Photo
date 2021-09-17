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

  uploadFile(){

    //Getting all available course codes
    // return this.http.put(baseUrl+"/photo/upload", )
  }
}
