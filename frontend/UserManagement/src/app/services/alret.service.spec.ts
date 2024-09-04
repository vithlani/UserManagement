import { TestBed } from '@angular/core/testing';

import { AlretService } from './alret.service';

describe('AlretService', () => {
  let service: AlretService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlretService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
