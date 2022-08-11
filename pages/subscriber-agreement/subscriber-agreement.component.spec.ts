import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriberAgreementComponent } from './subscriber-agreement.component';

describe('SubscriberAgreementComponent', () => {
  let component: SubscriberAgreementComponent;
  let fixture: ComponentFixture<SubscriberAgreementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriberAgreementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriberAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
