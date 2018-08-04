import { TestBed, inject } from '@angular/core/testing';

import { AgMembersService } from './ag-members.service';

describe('AgMembersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AgMembersService]
    });
  });

  it('should be created', inject([AgMembersService], (service: AgMembersService) => {
    expect(service).toBeTruthy();
  }));
});
