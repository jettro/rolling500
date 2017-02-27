import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingsanalyticsComponent } from './ratingsanalytics.component';

describe('RatingsanalyticsComponent', () => {
  let component: RatingsanalyticsComponent;
  let fixture: ComponentFixture<RatingsanalyticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingsanalyticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingsanalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
