import { TestBed } from '@angular/core/testing';

import { ViewCoordinationService } from './view-coordination.service';

describe('ViewCoordinationService', () => {
  let service: ViewCoordinationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewCoordinationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
