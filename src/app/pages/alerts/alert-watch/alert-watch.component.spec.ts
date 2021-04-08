import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertWatchComponent } from './alert-watch.component';

describe('AlertWatchComponent', () => {
  let component: AlertWatchComponent;
  let fixture: ComponentFixture<AlertWatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertWatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertWatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
