import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitDeviceComponent } from './init-device.component';

describe('InitDeviceComponent', () => {
  let component: InitDeviceComponent;
  let fixture: ComponentFixture<InitDeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitDeviceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InitDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
