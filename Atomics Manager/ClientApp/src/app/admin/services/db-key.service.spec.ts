import { TestBed, inject } from '@angular/core/testing';

import { DbKeyService } from './db-key.service';

describe('DbKeyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DbKeyService]
    });
  });

  it('should be created', inject([DbKeyService], (service: DbKeyService) => {
    expect(service).toBeTruthy();
  }));
});
