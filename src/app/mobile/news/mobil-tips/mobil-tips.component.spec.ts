import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobilTipsComponent } from './mobil-tips.component';

describe('MobilTipsComponent', () => {
  let component: MobilTipsComponent;
  let fixture: ComponentFixture<MobilTipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MobilTipsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MobilTipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
