import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CookiesManagementComponent } from './cookies-management.component';

describe('CookiesManagementComponent', () => {
  let component: CookiesManagementComponent;
  let fixture: ComponentFixture<CookiesManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CookiesManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CookiesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
