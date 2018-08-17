import { TestBed, inject } from '@angular/core/testing';

import { GroupMembersService } from './group-members.service';

describe('GroupMembersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GroupMembersService]
    });
  });

  it('should be created', inject([GroupMembersService], (service: GroupMembersService) => {
    expect(service).toBeTruthy();
  }));
});
