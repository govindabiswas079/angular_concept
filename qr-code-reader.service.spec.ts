import { TestBed } from '@angular/core/testing';

import { QrCodeReaderService } from './qr-code-reader.service';

describe('QrCodeReaderService', () => {
  let service: QrCodeReaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QrCodeReaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
