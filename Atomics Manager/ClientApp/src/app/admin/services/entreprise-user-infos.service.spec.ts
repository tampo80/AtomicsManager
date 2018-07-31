import { TestBed, inject } from '@angular/core/testing';

import { EntrepriseUserInfosService } from './entreprise-user-infos.service';

describe('EntrepriseUserInfosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EntrepriseUserInfosService]
    });
  });

  it('should be created', inject([EntrepriseUserInfosService], (service: EntrepriseUserInfosService) => {
    expect(service).toBeTruthy();
  }));
});
