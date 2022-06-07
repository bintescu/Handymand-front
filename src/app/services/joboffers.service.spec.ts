import { TestBed } from '@angular/core/testing';

import { JoboffersService } from './joboffers.service';

describe('JoboffersService', () => {
  let service: JoboffersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JoboffersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
