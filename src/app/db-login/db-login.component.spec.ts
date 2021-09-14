import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DbLoginComponent } from './db-login.component';

describe('DbLoginComponent', () => {
  let component: DbLoginComponent;
  let fixture: ComponentFixture<DbLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DbLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DbLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
