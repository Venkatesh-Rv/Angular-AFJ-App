import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDbComponent } from './product-db.component';

describe('ProductDbComponent', () => {
  let component: ProductDbComponent;
  let fixture: ComponentFixture<ProductDbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductDbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
