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
  // Variables to store the file being uploaded and the loading state
  private file: File;
  public loading: Boolean = false;

  // Output to send the file to the frontend as soon as it is uploaded
  @Output()
  public uploadedFile = new EventEmitter();

  // Selecting the file
  public onFileSelect(event) {
    this.file = event.target.files[0];

    // As soon as the file is selected, it is uploaded
    this.onUpload();
  }

  // Handing the file uploade
  public onUpload() {
    // Updating loading state
    this.loading = true;

    // Calling the photo upload service with the current file
    this.photoUploadService.uploadFile(this.file).subscribe(
      (res: any) => {
        this.uploadedFile.emit(res.response.photo);

        // Updating loading state
        this.loading = false;
      },

      // Catching an error if the user upload a faulty image
      (err) => {
        window.alert(
          'Please upload a valid image with any of the following extensions: jpeg, jfif, gif, jpg, png, svg'
        );

        // Updating loading state
        this.loading = false;
      }
    );
  }

  // Injecting the photoUploadService
  constructor(private photoUploadService: PhotoUploadService) {}

  ngOnInit(): void {}
}
