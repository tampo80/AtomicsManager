import { TestBed, inject } from '@angular/core/testing';

import { DepartementsService } from './departements.service';

describe('DepartementsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DepartementsService]
    });
  });

  it('should be created', inject([DepartementsService], (service: DepartementsService) => {
    expect(service).toBeTruthy();
  }));
});
