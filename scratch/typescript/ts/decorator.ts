export {};

function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  console.log('Decorator executed');
  console.log('target', target === Teste.prototype);
  console.log('propertKey', propertyKey);
  console.log(descriptor.value);
  // console.log('----');
  
  // const originalMethod = descriptor.value;
  // descriptor.value = function (...args: any[]) {
  //   console.log('Method called with arguments:', args);
  //   return originalMethod.apply(this, args);
  // }
  // return descriptor;
  return {
    ...descriptor,
    value: function (...args: any[]) {
      console.log('Method called with arguments:', args);
      return descriptor.value.apply(this, args);
    }
  }
  
}

class Teste {  
  @log
  metodoTeste(name: string) {
    console.log(`Method executed ${name}`);
  }
}

const teste = new Teste();
teste.metodoTeste('Maria');