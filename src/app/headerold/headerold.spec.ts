import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Headerold } from './headerold';

describe('Headerold', () => {
  let component: Headerold;
  let fixture: ComponentFixture<Headerold>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Headerold]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Headerold);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
