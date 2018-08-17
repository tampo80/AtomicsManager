import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEditionDialogComponent } from './new-edition-dialog.component';

describe('NewEditionDialogComponent', () => {
  let component: NewEditionDialogComponent;
  let fixture: ComponentFixture<NewEditionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewEditionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEditionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
