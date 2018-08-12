import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-image-copper',
  templateUrl: './image-copper.component.html',
  styleUrls: ['./image-copper.component.scss']
})
export class ImageCopperComponent implements OnInit {
  imageChangedEvent: any = '';
  croppedImage: any = '';
  cropperReady = false;
  selectedFile: File;
  constructor(public dialogRef: MatDialogRef<ImageCopperComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }


  fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
  }
  imageCroppedBase64(image: string) {
      this.croppedImage = image;
  }
  imageLoaded() {
    this.cropperReady = true;
  }
  imageLoadFailed () {
    console.log('Load failed');
  }

  imageCroppedFile(image: File) {
    this.selectedFile = image;
  }

  onNoClick(): void {
    this.dialogRef.close({result: 0});
  }

  apply(): void {
    this.dialogRef.close({result: {
      base64: this.croppedImage,
      blob: this.selectedFile
    }});
  }
}
