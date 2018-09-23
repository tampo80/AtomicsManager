import { TestBed } from '@angular/core/testing';

import { BonLivraisonService } from './bon-livraison.service';

describe('BonLivraisonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BonLivraisonService = TestBed.get(BonLivraisonService);
    expect(service).toBeTruthy();
  });
});
