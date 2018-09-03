import { TestBed, inject } from '@angular/core/testing';

import { TypeComptesService } from './type-comptes.service';

describe('TypeComptesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TypeComptesService]
    });
  });

  it('should be created', inject([TypeComptesService], (service: TypeComptesService) => {
    expect(service).toBeTruthy();
  }));
});
