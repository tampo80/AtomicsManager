import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCategoriesDialogComponent } from './edit-categories-dialog.component';

describe('EditCategoriesDialogComponent', () => {
  let component: EditCategoriesDialogComponent;
  let fixture: ComponentFixture<EditCategoriesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCategoriesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCategoriesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
