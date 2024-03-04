import { TestBed } from '@angular/core/testing';

import { CatsService } from './cats.service';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientModule } from "@angular/common/http";

describe('CatsService', () => {
  let service: CatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule]
    });
    service = TestBed.inject(CatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
