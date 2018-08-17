import { TestBed, inject } from '@angular/core/testing';

import { TransitionActionService } from './transition-action.service';

describe('TransitionActionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransitionActionService]
    });
  });

  it('should be created', inject([TransitionActionService], (service: TransitionActionService) => {
    expect(service).toBeTruthy();
  }));
});
