import { TestBed } from '@angular/core/testing';

import { WpxServicesIndexDBService } from './wpx-services-index-db.service';

describe('WpxServicesIndexDBService', () => {
  let service: WpxServicesIndexDBService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WpxServicesIndexDBService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
