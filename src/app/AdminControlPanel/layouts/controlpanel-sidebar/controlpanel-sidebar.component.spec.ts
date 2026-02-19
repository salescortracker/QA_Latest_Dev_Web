import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlpanelSidebarComponent } from './controlpanel-sidebar.component';

describe('ControlpanelSidebarComponent', () => {
  let component: ControlpanelSidebarComponent;
  let fixture: ComponentFixture<ControlpanelSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ControlpanelSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlpanelSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
