import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumusersanalyticsComponent } from './numusersanalytics.component';

describe('NumusersanalyticsComponent', () => {
  let component: NumusersanalyticsComponent;
  let fixture: ComponentFixture<NumusersanalyticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumusersanalyticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumusersanalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
