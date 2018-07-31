import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprobationLevelComponent } from './approbation-level.component';

describe('ApprobationLevelComponent', () => {
  let component: ApprobationLevelComponent;
  let fixture: ComponentFixture<ApprobationLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprobationLevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprobationLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
