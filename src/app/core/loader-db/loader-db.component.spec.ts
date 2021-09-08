import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderDbComponent } from './loader-db.component';

describe('LoaderDbComponent', () => {
  let component: LoaderDbComponent;
  let fixture: ComponentFixture<LoaderDbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoaderDbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderDbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
