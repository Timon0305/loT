import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppToastrComponent } from './app-toastr.component';

describe('AppToastrComponent', () => {
  let component: AppToastrComponent;
  let fixture: ComponentFixture<AppToastrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppToastrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppToastrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
