import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DbForgotPwdComponent } from './db-forgot-pwd.component';

describe('DbForgotPwdComponent', () => {
  let component: DbForgotPwdComponent;
  let fixture: ComponentFixture<DbForgotPwdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DbForgotPwdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DbForgotPwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
