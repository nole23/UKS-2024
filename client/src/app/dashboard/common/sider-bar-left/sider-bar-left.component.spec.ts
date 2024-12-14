import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiderBarLeftComponent } from './sider-bar-left.component';

describe('SiderBarLeftComponent', () => {
  let component: SiderBarLeftComponent;
  let fixture: ComponentFixture<SiderBarLeftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiderBarLeftComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiderBarLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
