import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageCopperComponent } from './image-copper.component';

describe('ImageCopperComponent', () => {
  let component: ImageCopperComponent;
  let fixture: ComponentFixture<ImageCopperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageCopperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageCopperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
