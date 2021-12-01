import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverRaceTableComponent } from './driver-race-table.component';

describe('DriverRaceTableComponent', () => {
  let component: DriverRaceTableComponent;
  let fixture: ComponentFixture<DriverRaceTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverRaceTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverRaceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
