import { TestBed, inject } from '@angular/core/testing';

import { BankInfosService } from './bank-infos.service';

describe('BankInfosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BankInfosService]
    });
  });

  it('should be created', inject([BankInfosService], (service: BankInfosService) => {
    expect(service).toBeTruthy();
  }));
});
