import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenborEmulatorComponent } from './openbor-emulator.component';

describe('OpenborEmulatorComponent', () => {
  let component: OpenborEmulatorComponent;
  let fixture: ComponentFixture<OpenborEmulatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OpenborEmulatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OpenborEmulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
