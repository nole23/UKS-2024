import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiferredSidePanelComponent } from './diferred-side-panel.component';

describe('DiferredSidePanelComponent', () => {
  let component: DiferredSidePanelComponent;
  let fixture: ComponentFixture<DiferredSidePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiferredSidePanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiferredSidePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
