import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDevisesDialogComponent } from './edit-devises-dialog.component';

describe('EditDevisesDialogComponent', () => {
  let component: EditDevisesDialogComponent;
  let fixture: ComponentFixture<EditDevisesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDevisesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDevisesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
