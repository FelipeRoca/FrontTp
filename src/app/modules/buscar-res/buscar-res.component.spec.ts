import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarResComponent } from './buscar-res.component';

describe('BuscarResComponent', () => {
  let component: BuscarResComponent;
  let fixture: ComponentFixture<BuscarResComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuscarResComponent]
    });
    fixture = TestBed.createComponent(BuscarResComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});

