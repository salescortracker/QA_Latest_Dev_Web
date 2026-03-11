import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConrolpanelFooterComponent } from './conrolpanel-footer.component';

describe('ConrolpanelFooterComponent', () => {
  let component: ConrolpanelFooterComponent;
  let fixture: ComponentFixture<ConrolpanelFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConrolpanelFooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConrolpanelFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
