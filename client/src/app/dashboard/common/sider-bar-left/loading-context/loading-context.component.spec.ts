import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingContextComponent } from './loading-context.component';

describe('LoadingContextComponent', () => {
  let component: LoadingContextComponent;
  let fixture: ComponentFixture<LoadingContextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingContextComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingContextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
