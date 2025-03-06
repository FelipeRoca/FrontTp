import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityCardsComponent } from './city-cards.component';

describe('CityCardsComponent', () => {
  let component: CityCardsComponent;
  let fixture: ComponentFixture<CityCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CityCardsComponent]
    });
    fixture = TestBed.createComponent(CityCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
