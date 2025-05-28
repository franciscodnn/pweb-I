import { Component } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, ValidationErrors, ValidatorFn, ReactiveFormsModule } from '@angular/forms';

// Validador customizado para CPF
export function cpfValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const cpf = control.value;
    if (!cpf) return null;
    
    // Lógica simplificada de validação de CPF
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    const valid = cpfRegex.test(cpf);
    
    return valid ? null : { cpfInvalid: true };
  };
}

// Uso no componente
@Component({
  selector: 'form-custom-validation',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="customForm">
      <div>
        <label for="cpf">CPF:</label>
        <input id="cpf" type="text" formControlName="cpf" placeholder="000.000.000-00">
        @if (cpf?.invalid && cpf?.touched) {
          <div class="error">
            @if (cpf?.errors?.['cpfInvalid']) {
              <div>CPF deve ter formato válido</div>
            }
          </div>
        }
      </div>
    </form>
  `
})
export class CustomValidationComponent {
  customForm = new FormGroup({
    cpf: new FormControl('', [cpfValidator()])
  });

  get cpf() { return this.customForm.get('cpf'); }
}