import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DbRegisterComponent } from './db-register.component';

describe('DbRegisterComponent', () => {
  let component: DbRegisterComponent;
  let fixture: ComponentFixture<DbRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DbRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DbRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
