import { TestBed, inject } from '@angular/core/testing';

import { ActiviteTargetService } from './activite-target.service';

describe('ActiviteTargetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActiviteTargetService]
    });
  });

  it('should be created', inject([ActiviteTargetService], (service: ActiviteTargetService) => {
    expect(service).toBeTruthy();
  }));
});
