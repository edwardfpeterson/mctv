import { TestBed } from '@angular/core/testing';

import { ViolationService } from './violation.service';
import { HttpClientModule } from '@angular/common/http';

describe('ViolationService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ]
  }));

  it('should be created', () => {
    const service: ViolationService = TestBed.get(ViolationService);
    expect(service).toBeTruthy();
  });
});
