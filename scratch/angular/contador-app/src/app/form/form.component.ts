import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'form-builder',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="profileForm" (ngSubmit)="onSubmit()">
      <div>
        <label for="firstName">Nome:</label>
        <input id="firstName" type="text" formControlName="firstName">
      </div>
      
      <div>
        <label for="lastName">Sobrenome:</label>
        <input id="lastName" type="text" formControlName="lastName">
      </div>

      <div>
        <label for="lastName">Idade:</label>
        <input id="lastName" type="text" formControlName="age">
      </div>
      
      <div formGroupName="address">
        <h3>Endereço</h3>
        <label for="street">Rua:</label>
        <input id="street" type="text" formControlName="street">
        
        <label for="city">Cidade:</label>
        <input id="city" type="text" formControlName="city">
      </div>
      
      <button type="submit">Salvar</button>
    </form>
  `
})
export class FormBuilderComponent {
  private fb = inject(FormBuilder);

  profileForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: [''],
    age: [null, [Validators.required, Validators.min(18)]],
    address: this.fb.group({
      street: [''],
      city: ['']
    })
  });

  onSubmit(): void {
    console.log('Profile:', this.profileForm.value);
  }
}