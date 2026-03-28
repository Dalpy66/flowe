import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagmentGarden } from './managment-garden';

describe('ManagmentGarden', () => {
  let component: ManagmentGarden;
  let fixture: ComponentFixture<ManagmentGarden>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagmentGarden],
    }).compileComponents();

    fixture = TestBed.createComponent(ManagmentGarden);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
