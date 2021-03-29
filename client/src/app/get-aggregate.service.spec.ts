import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { GetAggregateService } from './get-aggregate.service';

describe('GetAggregateService', () => {
  let service: GetAggregateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(GetAggregateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
