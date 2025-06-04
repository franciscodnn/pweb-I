import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

// Validador personalizado para CPF
export function cpfValidator(control: AbstractControl): ValidationErrors | null {
  const cpf = control.value?.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
  
  if (!cpf) {
    return null; // Deixa o required handle this
  }

  if (cpf.length !== 11) {
    return { cpfInvalid: true };
  }

  return null; // CPF válido

  // // Verifica se todos os dígitos são iguais
  // if (/^(\d)\1{10}$/.test(cpf)) {
  //   return { cpfInvalid: true };
  // }

  // // Validação do primeiro dígito verificador
  // let sum = 0;
  // for (let i = 0; i < 9; i++) {
  //   sum += parseInt(cpf.charAt(i)) * (10 - i);
  // }
  // let remainder = 11 - (sum % 11);
  // let digit1 = remainder < 2 ? 0 : remainder;

  // if (parseInt(cpf.charAt(9)) !== digit1) {
  //   return { cpfInvalid: true };
  // }

  // // Validação do segundo dígito verificador
  // sum = 0;
  // for (let i = 0; i < 10; i++) {
  //   sum += parseInt(cpf.charAt(i)) * (11 - i);
  // }
  // remainder = 11 - (sum % 11);
  // let digit2 = remainder < 2 ? 0 : remainder;

  // if (parseInt(cpf.charAt(10)) !== digit2) {
  //   return { cpfInvalid: true };
  // }

  // return null; // CPF válido
}

// Função para aplicar máscara ao CPF
export function applyCpfMask(value: string): string {
  if (!value) return '';
  
  // Remove todos os caracteres não numéricos
  const numbers = value.replace(/\D/g, '');
  
  // Aplica a máscara
  if (numbers.length <= 3) {
    return numbers;
  } else if (numbers.length <= 6) {
    return numbers.replace(/(\d{3})(\d+)/, '$1.$2');
  } else if (numbers.length <= 9) {
    return numbers.replace(/(\d{3})(\d{3})(\d+)/, '$1.$2.$3');
  } else {
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }
}

function validadorCPF() {
  
}

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'app-formularios';

  error = 'color: red; margin-left: 10px;';

  errors = {
    nome: {
      required: 'O campo nome é obrigatório',
      minlength: 'O campo nome deve ter no mínimo 3 caracteres'
    },
    idade: {
      required: 'O campo idade é obrigatório',
      min: 'A idade mínima é 18 anos',
      max: 'A idade máxima é 120 anos'
    },
    email: {
      required: 'O campo email é obrigatório',
      email: 'O email informado não é válido'
    },
    cpf: {
      required: 'O campo CPF é obrigatório',
      cpfInvalid: 'O CPF informado não é válido'
    }
  }

  form = new FormGroup({
    nome: new FormControl(''),
    idade: new FormControl(),
    email: new FormControl(''),
    cpf: new FormControl('')
  });

  formBuilderCreator = inject(FormBuilder);

  formBuilder = this.formBuilderCreator.group({
    nome: ['', [Validators.required, Validators.minLength(3)]],
    idade: [null, [Validators.required, Validators.min(18), Validators.max(120)]],
    email: ['', [Validators.required, Validators.email]],
    cpf: ['', [Validators.required, cpfValidator]]
  });

  get nome() {
    return this.formBuilder.get('nome');
  }

  get idade() {
    return this.formBuilder.get('idade');
  }

  get email() {
    return this.formBuilder.get('email');
  }

  get cpf() {
    return this.formBuilder.get('cpf');
  }

  // Método para lidar com a entrada do CPF e aplicar a máscara
  onCpfInput(event: any) {
    const input = event.target;
    const value = input.value;
    const maskedValue = applyCpfMask(value);
    
    // Atualiza o valor do controle com a máscara
    this.formBuilder.get('cpf')?.setValue(maskedValue, { emitEvent: false });
    
    // Atualiza o valor do input
    input.value = maskedValue;
  }

  handleSubmit() {
    console.log(this.formBuilder.value);
  }
}
