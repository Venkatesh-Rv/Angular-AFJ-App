import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnkletComponent } from './anklet.component';

describe('AnkletComponent', () => {
  let component: AnkletComponent;
  let fixture: ComponentFixture<AnkletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnkletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnkletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
