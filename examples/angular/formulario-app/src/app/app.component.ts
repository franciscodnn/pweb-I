import { Component, inject } from '@angular/core';

import { ReactiveFormsModule, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'formulario-app';

  /* -- FormGroup */
  userFormGroup = new FormGroup({
    name: new FormControl(''),
    age: new FormControl(0),
    emailGroup: new FormControl(''),
    cpfGroup: new FormControl('')
  });

  nome = new FormControl('');
  idade = new FormControl(18);
  email = new FormControl('');
  cpf = new FormControl('');

  /* -- FormBuilder -- */
  formBuilder = inject(FormBuilder);

  userFormBuilder = this.formBuilder.group({
    nameBuilder: ['', Validators.required],
    ageBuilder: 
      [0, [Validators.min(18), Validators.max(150)] ],
    emailBuilder: [''],
    cpfBuilder: ['']
  });

  handleSubmit() {
    // console.log(this.nome.value);
    // console.log(this.idade.value);

    console.log(this.userFormBuilder.value);
  }
}
