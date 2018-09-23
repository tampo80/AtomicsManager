import { TestBed } from '@angular/core/testing';

import { ReglementsService } from './reglements.service';

describe('ReglementsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReglementsService = TestBed.get(ReglementsService);
    expect(service).toBeTruthy();
  });
});
