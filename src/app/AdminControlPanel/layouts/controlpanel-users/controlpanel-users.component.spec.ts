import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlpanelUsersComponent } from './controlpanel-users.component';

describe('ControlpanelUsersComponent', () => {
  let component: ControlpanelUsersComponent;
  let fixture: ComponentFixture<ControlpanelUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ControlpanelUsersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlpanelUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
