import { TestBed } from '@angular/core/testing';

import { Sensoriservice } from './sensoriservice';

describe('Sensoriservice', () => {
  let service: Sensoriservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Sensoriservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
