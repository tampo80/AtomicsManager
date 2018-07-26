import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddArticlesDialogComponent } from './add-articles-dialog.component';

describe('AddArticlesDialogComponent', () => {
  let component: AddArticlesDialogComponent;
  let fixture: ComponentFixture<AddArticlesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddArticlesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddArticlesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
