import { TestBed } from '@angular/core/testing';

import { CargaconfService } from './cargaconf.service';

describe('CargaconfService', () => {
  let service: CargaconfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CargaconfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
