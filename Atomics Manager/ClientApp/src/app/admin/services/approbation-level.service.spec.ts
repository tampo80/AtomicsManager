import { TestBed, inject } from '@angular/core/testing';

import { ApprobationLevelService } from './approbation-level.service';

describe('ApprobationLevelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApprobationLevelService]
    });
  });

  it('should be created', inject([ApprobationLevelService], (service: ApprobationLevelService) => {
    expect(service).toBeTruthy();
  }));
});
