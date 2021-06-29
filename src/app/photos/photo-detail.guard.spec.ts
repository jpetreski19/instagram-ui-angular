import { TestBed } from '@angular/core/testing';

import { PhotoDetailGuard } from './photo-detail.guard';

describe('PhotoDetailGuard', () => {
  let guard: PhotoDetailGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PhotoDetailGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
