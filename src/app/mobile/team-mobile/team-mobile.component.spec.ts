import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamMobileComponent } from './team-mobile.component';

describe('TeamMobileComponent', () => {
  let component: TeamMobileComponent;
  let fixture: ComponentFixture<TeamMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamMobileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeamMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
