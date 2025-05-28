import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'validation-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="validationForm" (ngSubmit)="onSubmit()">
      <div>
        <label for="name">Nome (obrigatório):</label>
        <input id="name" type="text" formControlName="name">
        @if (name?.invalid && name?.touched) {
          <div class="error">
            @if (name?.errors?.['required']) {
              <div>Nome é obrigatório</div>
            }
            @if (name?.errors?.['minlength']) {
              <div>Nome deve ter pelo menos 2 caracteres</div>
            }
          </div>
        }
      </div>
      
      <div>
        <label for="email">Email:</label>
        <input id="email" type="email" formControlName="email">
        @if (email?.invalid && email?.touched) {
          <div class="error">
            @if (email?.errors?.['required']) {
              <div>Email é obrigatório</div>
            }
            @if (email?.errors?.['email']) {
              <div>Email deve ter formato válido</div>
            }
          </div>
        }
      </div>
      
      <div>
        <label for="age">Idade:</label>
        <input id="age" type="number" formControlName="age">
        @if (age?.invalid && age?.touched) {
          <div class="error">
            @if (age?.errors?.['min']) {
              <div>Idade mínima é 18 anos</div>
            }
            @if (age?.errors?.['max']) {
              <div>Idade máxima é 100 anos</div>
            }
          </div>
        }
      </div>
      
      <button type="submit" [disabled]="validationForm.invalid">
        Enviar
      </button>
    </form>
    
    <div>
      <p>Status do formulário: {{ validationForm.status }}</p>
      <p>Formulário válido: {{ validationForm.valid }}</p>
    </div>
  `,
  styles: [`
    .error {
      color: red;
      font-size: 0.8em;
      margin-top: 0.25rem;
    }
  `]
})
export class ValidationFormComponent {
  validationForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    age: new FormControl(0, [
      Validators.min(18),
      Validators.max(100)
    ])
  });

  get name() { return this.validationForm.get('name'); }
  get email() { return this.validationForm.get('email'); }
  get age() { return this.validationForm.get('age'); }

  onSubmit() {
    if (this.validationForm.valid) {
      console.log('Formulário válido:', this.validationForm.value);
    } else {
      console.log('Formulário inválido');
      this.validationForm.markAllAsTouched();
    }
  }
}