import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Happy } from './happy';

describe('Happy', () => {
  let component: Happy;
  let fixture: ComponentFixture<Happy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Happy]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Happy);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
