import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerUploadComponent } from './banner-upload.component';

describe('BannerUploadComponent', () => {
  let component: BannerUploadComponent;
  let fixture: ComponentFixture<BannerUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
