import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvidencesanalyticsComponent } from './evidencesanalytics.component';

describe('EvidencesanalyticsComponent', () => {
  let component: EvidencesanalyticsComponent;
  let fixture: ComponentFixture<EvidencesanalyticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvidencesanalyticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvidencesanalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
