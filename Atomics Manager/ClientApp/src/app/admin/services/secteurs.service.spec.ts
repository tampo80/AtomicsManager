import { TestBed, inject } from '@angular/core/testing';

import { SecteursService } from './secteurs.service';

describe('SecteursService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SecteursService]
    });
  });

  it('should be created', inject([SecteursService], (service: SecteursService) => {
    expect(service).toBeTruthy();
  }));
});
