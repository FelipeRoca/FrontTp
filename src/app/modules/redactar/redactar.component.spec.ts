import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedactarComponent } from './redactar.component';

describe('RedactarComponent', () => {
  let component: RedactarComponent;
  let fixture: ComponentFixture<RedactarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RedactarComponent]
    });
    fixture = TestBed.createComponent(RedactarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
