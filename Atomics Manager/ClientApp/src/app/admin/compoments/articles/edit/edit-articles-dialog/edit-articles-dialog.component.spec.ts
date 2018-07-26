import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditArticlesDialogComponent } from './edit-articles-dialog.component';

describe('EditArticlesDialogComponent', () => {
  let component: EditArticlesDialogComponent;
  let fixture: ComponentFixture<EditArticlesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditArticlesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditArticlesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
