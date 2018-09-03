import { TestBed, inject } from '@angular/core/testing';

import { ComptesInternesService } from './comptes-internes.service';

describe('ComptesInternesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComptesInternesService]
    });
  });

  it('should be created', inject([ComptesInternesService], (service: ComptesInternesService) => {
    expect(service).toBeTruthy();
  }));
});
