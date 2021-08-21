import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChokerComponent } from './choker.component';

describe('ChokerComponent', () => {
  let component: ChokerComponent;
  let fixture: ComponentFixture<ChokerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChokerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChokerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
