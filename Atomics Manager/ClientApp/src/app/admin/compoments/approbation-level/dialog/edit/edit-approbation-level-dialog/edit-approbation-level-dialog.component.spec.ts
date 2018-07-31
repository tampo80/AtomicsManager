import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditApprobationLevelDialogComponent } from './edit-approbation-level-dialog.component';

describe('EditApprobationLevelDialogComponent', () => {
  let component: EditApprobationLevelDialogComponent;
  let fixture: ComponentFixture<EditApprobationLevelDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditApprobationLevelDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditApprobationLevelDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
