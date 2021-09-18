import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DbUserProfileComponent } from './db-user-profile.component';

describe('DbUserProfileComponent', () => {
  let component: DbUserProfileComponent;
  let fixture: ComponentFixture<DbUserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DbUserProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DbUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
