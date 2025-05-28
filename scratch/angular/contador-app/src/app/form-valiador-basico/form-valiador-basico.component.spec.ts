import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormValiadorBasicoComponent } from './form-valiador-basico.component';

describe('FormValiadorBasicoComponent', () => {
  let component: FormValiadorBasicoComponent;
  let fixture: ComponentFixture<FormValiadorBasicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormValiadorBasicoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormValiadorBasicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
