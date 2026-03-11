import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlpanelTopbarComponent } from './controlpanel-topbar.component';

describe('ControlpanelTopbarComponent', () => {
  let component: ControlpanelTopbarComponent;
  let fixture: ComponentFixture<ControlpanelTopbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ControlpanelTopbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlpanelTopbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
