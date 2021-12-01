import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceDriverTableComponent } from './race-driver-table.component';

describe('RaceDriverTableComponent', () => {
  let component: RaceDriverTableComponent;
  let fixture: ComponentFixture<RaceDriverTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaceDriverTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaceDriverTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
