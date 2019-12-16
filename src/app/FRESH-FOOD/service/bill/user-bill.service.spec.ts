import { TestBed } from '@angular/core/testing';

import { UserBillService } from './user-bill.service';

describe('UserBillService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserBillService = TestBed.get(UserBillService);
    expect(service).toBeTruthy();
  });
});
