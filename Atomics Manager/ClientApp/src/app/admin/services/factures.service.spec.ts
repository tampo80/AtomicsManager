import { TestBed, inject } from '@angular/core/testing';

import { FacturesService } from './factures.service';

describe('FacturesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FacturesService]
    });
  });

  it('should be created', inject([FacturesService], (service: FacturesService) => {
    expect(service).toBeTruthy();
  }));
});
