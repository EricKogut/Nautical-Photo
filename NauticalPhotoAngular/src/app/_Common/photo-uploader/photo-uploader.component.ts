import { Component, OnInit } from '@angular/core';

// Services
import { PhotoUploadService } from 'src/app/_Services/photo-upload.service';
@Component({
  selector: 'app-photo-uploader',
  templateUrl: './photo-uploader.component.html',
  styleUrls: ['./photo-uploader.component.scss'],
})
export class PhotoUploaderComponent implements OnInit {
  private file: File;
  public onFileSelect(event) {
    this.file = event.target.files[0];
    this.onUpload();
  }
  public onUpload() {
    this.photoUploadService.uploadFile(this.file).subscribe((res) => {
      console.log(res, 'is the res');
    });
  }

  constructor(private photoUploadService: PhotoUploadService) {}

  ngOnInit(): void {}
}
