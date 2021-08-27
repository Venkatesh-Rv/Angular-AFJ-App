import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoseRingComponent } from './nose-ring.component';

describe('NoseRingComponent', () => {
  let component: NoseRingComponent;
  let fixture: ComponentFixture<NoseRingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoseRingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoseRingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
