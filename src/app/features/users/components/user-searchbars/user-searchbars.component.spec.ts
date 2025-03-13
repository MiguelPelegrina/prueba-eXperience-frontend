import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSearchbarsComponent } from './user-searchbars.component';

describe('UserSearchbarsComponent', () => {
  let component: UserSearchbarsComponent;
  let fixture: ComponentFixture<UserSearchbarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserSearchbarsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserSearchbarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
