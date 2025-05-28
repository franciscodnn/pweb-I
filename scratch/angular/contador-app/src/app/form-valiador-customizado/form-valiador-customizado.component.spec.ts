import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormValiadorCustomizadoComponent } from './form-valiador-customizado.component';

describe('FormValiadorCustomizadoComponent', () => {
  let component: FormValiadorCustomizadoComponent;
  let fixture: ComponentFixture<FormValiadorCustomizadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormValiadorCustomizadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormValiadorCustomizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
