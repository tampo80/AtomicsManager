import { TestBed } from '@angular/core/testing';

import { BonDeCommandeService } from './bon-de-commande.service';

describe('BonDeCommandeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BonDeCommandeService = TestBed.get(BonDeCommandeService);
    expect(service).toBeTruthy();
  });
});
