import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-photo-uploader',
  templateUrl: './photo-uploader.component.html',
  styleUrls: ['./photo-uploader.component.sass'],
})
export class PhotoUploaderComponent implements OnInit {
  private file: EventTarget;
  public onFileSelect(event) {
    this.file = event.target.files[0];
  }
  public onUpload() {
    
  }

  constructor() {}

  ngOnInit(): void {}
}
