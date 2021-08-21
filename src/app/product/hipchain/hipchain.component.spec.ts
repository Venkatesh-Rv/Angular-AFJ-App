import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HipchainComponent } from './hipchain.component';

describe('HipchainComponent', () => {
  let component: HipchainComponent;
  let fixture: ComponentFixture<HipchainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HipchainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HipchainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
