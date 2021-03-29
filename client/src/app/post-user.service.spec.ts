import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { PostUserService } from './post-user.service';

describe('PostUserService', () => {
  let service: PostUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(PostUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
