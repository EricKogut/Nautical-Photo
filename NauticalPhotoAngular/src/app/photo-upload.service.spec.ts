import { TestBed } from '@angular/core/testing';

import { PhotoUploadService } from './_Services/photo-upload.service';

describe('PhotoUploadService', () => {
  let service: PhotoUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhotoUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
