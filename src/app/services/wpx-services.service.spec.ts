import { TestBed } from '@angular/core/testing';

import { WpxServicesService } from './wpx-services.service';

describe('WpxServicesService', () => {
  let service: WpxServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WpxServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
