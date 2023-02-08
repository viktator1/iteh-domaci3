import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OsobaCrudComponent } from './osoba-crud.component';

describe('OsobaCrudComponent', () => {
  let component: OsobaCrudComponent;
  let fixture: ComponentFixture<OsobaCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OsobaCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OsobaCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
