import { TestBed, inject } from '@angular/core/testing';

import { ApprobationWorkflowService } from './approbation-workflow.service';

describe('ApprobationWorkflowService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApprobationWorkflowService]
    });
  });

  it('should be created', inject([ApprobationWorkflowService], (service: ApprobationWorkflowService) => {
    expect(service).toBeTruthy();
  }));
});
