import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobilListComponent } from './mobil-list.component';

describe('MobilListComponent', () => {
  let component: MobilListComponent;
  let fixture: ComponentFixture<MobilListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MobilListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MobilListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
