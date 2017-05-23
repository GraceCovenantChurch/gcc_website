import { TestBed, inject } from '@angular/core/testing';

import { MinistriesService } from './ministries.service';

describe('MinistriesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MinistriesService]
    });
  });

  it('should be created', inject([MinistriesService], (service: MinistriesService) => {
    expect(service).toBeTruthy();
  }));
});
