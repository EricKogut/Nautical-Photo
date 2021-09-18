import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { environment } from 'src/environments/environment';
import { PhotoUploadService } from './photo-upload.service';
import { HttpClientModule } from '@angular/common/http';

const baseUrl = environment.backend_url;

describe('PhotoUploadService', () => {
  let service: PhotoUploadService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PhotoUploadService],
    });
    service = TestBed.inject(PhotoUploadService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  const data = new FormData();
  var initialFile = new File(['3555'], 'test-file.jpg', {
    lastModified: 1,
    type: 'image/jpeg',
  });

  var file = new Blob(['my data'], {
    type: initialFile.type,
  });

  data.append('file', file, 'yeet');
  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('uploadFile should send a POST request and return the URL of the photo', (done) => {
    service.uploadFile('1').subscribe(
      (response) => {
        expect(response).toBeDefined();
        done();
      },
      (error) => {
        fail(error.message);
      }
    );

    const testRequest = httpMock.expectOne('baseURL' + '/photo/upload');
    expect(testRequest.request.method).toBe('POST');
    testRequest.flush({
      id: 1,
      userId: 1,
      title: 'Test Todo',
      completed: false,
    });
  });
});
