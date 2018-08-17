import { TestBed, inject } from '@angular/core/testing';

import { EtatService } from './etat.service';

describe('EtatService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EtatService]
    });
  });

  it('should be created', inject([EtatService], (service: EtatService) => {
    expect(service).toBeTruthy();
  }));
});
