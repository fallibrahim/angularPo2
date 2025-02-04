import { TestBed } from '@angular/core/testing';

import { AccueilAdminService } from './accueil-admin.service';

describe('AccueilAdminService', () => {
  let service: AccueilAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccueilAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
