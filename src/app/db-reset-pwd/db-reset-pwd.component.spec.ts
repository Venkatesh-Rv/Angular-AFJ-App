import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DbResetPwdComponent } from './db-reset-pwd.component';

describe('DbResetPwdComponent', () => {
  let component: DbResetPwdComponent;
  let fixture: ComponentFixture<DbResetPwdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DbResetPwdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DbResetPwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
