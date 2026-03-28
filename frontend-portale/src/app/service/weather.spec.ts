import { TestBed } from '@angular/core/testing';
import { Weather } from '../components/shared/weather/weather';


describe('Weather', () => {
  let service: Weather;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Weather);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
