import { TestBed, inject } from '@angular/core/testing';

import { ActionTargetService } from './action-target.service';

describe('ActionTargetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActionTargetService]
    });
  });

  it('should be created', inject([ActionTargetService], (service: ActionTargetService) => {
    expect(service).toBeTruthy();
  }));
});
