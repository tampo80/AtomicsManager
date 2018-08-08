import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-a-pgembers',
  templateUrl: './a-pgembers.component.html',
  styleUrls: ['./a-pgembers.component.scss']
})
export class APGembersComponent implements OnInit {

  imageChangedEvent: any = '';
  croppedImage: any = '';
  cropperReady = false;

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
  constructor() { }

  ngOnInit() {
  }

}
