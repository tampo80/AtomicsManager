import { TestBed, inject } from '@angular/core/testing';

import { DevisesService } from './devises.service';

describe('DevisesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DevisesService]
    });
  });

  it('should be created', inject([DevisesService], (service: DevisesService) => {
    expect(service).toBeTruthy();
  }));
});
