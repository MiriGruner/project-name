import { TestBed } from '@angular/core/testing';

import { DonorServiceService } from '../Service/donor-service.service';

describe('DonorServiceService', () => {
  let service: DonorServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DonorServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
