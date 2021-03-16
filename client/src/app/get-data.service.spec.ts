import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { GetDataService } from './get-data.service';

describe('GetDataService', () => {
  let service: GetDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(GetDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
