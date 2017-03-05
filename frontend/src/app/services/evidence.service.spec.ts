import { TestBed, inject } from '@angular/core/testing';
import { EvidenceService } from './evidence.service';

describe('EvidenceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EvidenceService]
    });
  });

  it('should ...', inject([EvidenceService], (service: EvidenceService) => {
    expect(service).toBeTruthy();
  }));
});
