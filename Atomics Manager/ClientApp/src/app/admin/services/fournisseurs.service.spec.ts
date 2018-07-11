import { TestBed, inject } from '@angular/core/testing';

import { FournisseursService } from './fournisseurs.service';

describe('FournisseursService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FournisseursService]
    });
  });

  it('should be created', inject([FournisseursService], (service: FournisseursService) => {
    expect(service).toBeTruthy();
  }));
});
