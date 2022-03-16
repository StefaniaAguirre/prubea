import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsMakerComponent } from './details-maker.component';

describe('DetailsMakerComponent', () => {
  let component: DetailsMakerComponent;
  let fixture: ComponentFixture<DetailsMakerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsMakerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsMakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
