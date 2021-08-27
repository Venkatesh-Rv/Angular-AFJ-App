import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToeRingComponent } from './toe-ring.component';

describe('ToeRingComponent', () => {
  let component: ToeRingComponent;
  let fixture: ComponentFixture<ToeRingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToeRingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToeRingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
