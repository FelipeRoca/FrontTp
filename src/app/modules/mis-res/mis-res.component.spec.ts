import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisResComponent } from './mis-res.component';

describe('MisResComponent', () => {
  let component: MisResComponent;
  let fixture: ComponentFixture<MisResComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MisResComponent]
    });
    fixture = TestBed.createComponent(MisResComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
