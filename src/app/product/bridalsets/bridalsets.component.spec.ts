import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BridalsetsComponent } from './bridalsets.component';

describe('BridalsetsComponent', () => {
  let component: BridalsetsComponent;
  let fixture: ComponentFixture<BridalsetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BridalsetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BridalsetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
