import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OsobeTabelaComponent } from './osobe-tabela.component';

describe('OsobeTabelaComponent', () => {
  let component: OsobeTabelaComponent;
  let fixture: ComponentFixture<OsobeTabelaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OsobeTabelaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OsobeTabelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
