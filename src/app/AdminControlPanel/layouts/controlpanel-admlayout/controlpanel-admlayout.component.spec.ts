import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlpanelAdmlayoutComponent } from './controlpanel-admlayout.component';

describe('ControlpanelAdmlayoutComponent', () => {
  let component: ControlpanelAdmlayoutComponent;
  let fixture: ComponentFixture<ControlpanelAdmlayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ControlpanelAdmlayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlpanelAdmlayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
