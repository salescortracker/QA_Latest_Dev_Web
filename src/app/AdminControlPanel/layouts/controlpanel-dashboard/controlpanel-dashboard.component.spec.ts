import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlpanelDashboardComponent } from './controlpanel-dashboard.component';

describe('ControlpanelDashboardComponent', () => {
  let component: ControlpanelDashboardComponent;
  let fixture: ComponentFixture<ControlpanelDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ControlpanelDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlpanelDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
