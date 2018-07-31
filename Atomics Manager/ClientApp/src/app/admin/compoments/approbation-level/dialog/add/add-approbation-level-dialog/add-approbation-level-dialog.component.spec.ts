import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddApprobationLevelDialogComponent } from './add-approbation-level-dialog.component';

describe('AddApprobationLevelDialogComponent', () => {
  let component: AddApprobationLevelDialogComponent;
  let fixture: ComponentFixture<AddApprobationLevelDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddApprobationLevelDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddApprobationLevelDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
