import { TestBed } from '@angular/core/testing';

import { HourlyRateService } from './hourly-rate.service';

describe('HourlyRateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HourlyRateService = TestBed.get(HourlyRateService);
    expect(service).toBeTruthy();
  });
});
