import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

// Services
import { PhotoUploadService } from 'src/app/_Services/photo-upload.service';
@Component({
  selector: 'app-photo-uploader',
  templateUrl: './photo-uploader.component.html',
  styleUrls: ['./photo-uploader.component.scss'],
})
export class PhotoUploaderComponent implements OnInit {
  private file: File;
  public loading: Boolean = false;

  @Output()
  public uploadedFile = new EventEmitter();

  public onFileSelect(event) {
    this.file = event.target.files[0];
    this.onUpload();
  }
  public onUpload() {
    this.loading = true;
    this.photoUploadService.uploadFile(this.file).subscribe((res: any) => {
      this.uploadedFile.emit(res.response.photo);
      this.loading = false;
    });
  }

  constructor(private photoUploadService: PhotoUploadService) {}

  ngOnInit(): void {}
}
