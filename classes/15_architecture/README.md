[main](../../README.md)

# Aula 14 - Arquitetura de Sistemas - Padrões e Implementações Práticas

## 1. Introdução à Arquitetura de Software

### O que é Arquitetura de Software?

Arquitetura preocupa-se com projeto em mais alto nível, focando em unidades de maior tamanho, sejam elas pacotes, componentes, módulos, subsistemas, camadas ou serviços.

### Duas Definições Principais:

1. **Definição Estrutural**: Organização e interfaces de componentes de maior tamanho
2. **Definição de Decisões**: Inclui as decisões de projeto mais importantes em um sistema, que uma vez tomadas, dificilmente poderão ser revertidas no futuro

### Por que a Arquitetura é Importante?

- **Modularidade**: Organiza o sistema em componentes bem definidos
- **Manutenibilidade**: Facilita mudanças e evolução
- **Escalabilidade**: Permite crescimento do sistema
- **Testabilidade**: Componentes isolados são mais fáceis de testar

---

## 2. Arquitetura em Camadas (Layered Architecture)

### Conceito

As classes são organizadas em módulos de maior tamanho, chamados de camadas. As camadas são dispostas de forma hierárquica, como em um bolo. Uma camada somente pode usar serviços da camada imediatamente inferior.

### Vantagens

- **Separação de responsabilidades**: Cada camada tem uma função específica
- **Disciplina de dependências**: Controla as relações entre componentes
- **Facilita reutilização**: Camadas podem ser reutilizadas
- **Facilita substituição**: Camadas podem ser trocadas independentemente

### Exemplo Prático: Sistema Acadêmico em Spring Boot

#### Estrutura do Projeto
```
src/main/java/com/exemplo/academico/
├── controller/     # Camada de Apresentação
├── service/        # Camada de Negócio  
├── repository/     # Camada de Persistência
└── model/          # Modelos de Dados
```

#### Camada de Modelo (Entidades)
```java
// src/main/java/com/exemplo/academico/model/Aluno.java
@Entity
@Table(name = "alunos")
public class Aluno {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String nome;
    
    @Column(unique = true, nullable = false)
    private String matricula;
    
    @OneToMany(mappedBy = "aluno", cascade = CascadeType.ALL)
    private List<Nota> notas = new ArrayList<>();
    
    // Construtores, getters e setters
}

@Entity
@Table(name = "notas")
public class Nota {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private Double valor;
    
    @Column(nullable = false)
    private String disciplina;
    
    @ManyToOne
    @JoinColumn(name = "aluno_id")
    private Aluno aluno;
    
    // Construtores, getters e setters
}
```

#### Camada de Persistência (Repository)
```java
// src/main/java/com/exemplo/academico/repository/AlunoRepository.java
@Repository
public interface AlunoRepository extends JpaRepository<Aluno, Long> {
    Optional<Aluno> findByMatricula(String matricula);
    List<Aluno> findByNomeContainingIgnoreCase(String nome);
}

@Repository
public interface NotaRepository extends JpaRepository<Nota, Long> {
    List<Nota> findByAlunoId(Long alunoId);
    List<Nota> findByDisciplina(String disciplina);
}
```

#### Camada de Negócio (Service)
```java
// src/main/java/com/exemplo/academico/service/AlunoService.java
@Service
@Transactional
public class AlunoService {
    
    private final AlunoRepository alunoRepository;
    private final NotaRepository notaRepository;
    
    public AlunoService(AlunoRepository alunoRepository, NotaRepository notaRepository) {
        this.alunoRepository = alunoRepository;
        this.notaRepository = notaRepository;
    }
    
    public Aluno salvarAluno(Aluno aluno) {
        validarDadosAluno(aluno);
        return alunoRepository.save(aluno);
    }
    
    public void lancarNota(Long alunoId, String disciplina, Double valorNota) {
        // Regra de negócio: notas devem estar entre 0 e 10
        if (valorNota < 0 || valorNota > 10) {
            throw new IllegalArgumentException("Nota deve estar entre 0 e 10");
        }
        
        Aluno aluno = alunoRepository.findById(alunoId)
            .orElseThrow(() -> new EntityNotFoundException("Aluno não encontrado"));
        
        Nota nota = new Nota();
        nota.setValor(valorNota);
        nota.setDisciplina(disciplina);
        nota.setAluno(aluno);
        
        notaRepository.save(nota);
        
        // Regra de negócio: notificar aluno por email
        enviarNotificacaoEmail(aluno, disciplina, valorNota);
    }
    
    private void validarDadosAluno(Aluno aluno) {
        if (aluno.getNome() == null || aluno.getNome().trim().isEmpty()) {
            throw new IllegalArgumentException("Nome é obrigatório");
        }
        if (aluno.getMatricula() == null || aluno.getMatricula().trim().isEmpty()) {
            throw new IllegalArgumentException("Matrícula é obrigatória");
        }
    }
    
    private void enviarNotificacaoEmail(Aluno aluno, String disciplina, Double nota) {
        // Implementação do envio de email
        System.out.println("Email enviado para " + aluno.getNome() + 
                         " - Nota " + nota + " lançada em " + disciplina);
    }
}
```

#### Camada de Apresentação (Controller)
```java
// src/main/java/com/exemplo/academico/controller/AlunoController.java
@RestController
@RequestMapping("/api/alunos")
@CrossOrigin(origins = "http://localhost:4200")
public class AlunoController {
    
    private final AlunoService alunoService;
    
    public AlunoController(AlunoService alunoService) {
        this.alunoService = alunoService;
    }
    
    @PostMapping
    public ResponseEntity<Aluno> criarAluno(@Valid @RequestBody Aluno aluno) {
        try {
            Aluno novoAluno = alunoService.salvarAluno(aluno);
            return ResponseEntity.status(HttpStatus.CREATED).body(novoAluno);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PostMapping("/{id}/notas")
    public ResponseEntity<Void> lancarNota(
            @PathVariable Long id,
            @RequestBody NotaRequest request) {
        try {
            alunoService.lancarNota(id, request.getDisciplina(), request.getValor());
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping
    public ResponseEntity<List<Aluno>> listarAlunos() {
        List<Aluno> alunos = alunoService.listarTodos();
        return ResponseEntity.ok(alunos);
    }
}

// DTO para requisições
class NotaRequest {
    private String disciplina;
    private Double valor;
    
    // Getters e setters
}
```

---

## 3. Arquitetura MVC (Model-View-Controller)

### Conceito

MVC define que as classes de um sistema devem ser organizadas em três grupos: Visão (apresentação da interface), Controladoras (tratam eventos de entrada), e Modelo (armazenam dados do domínio).

### Componentes do MVC

1. **Model**: Dados e lógica de negócio
2. **View**: Interface com o usuário
3. **Controller**: Mediação entre Model e View

### Vantagens do MVC

- **Separação de responsabilidades**: Cada componente tem uma função específica
- **Reutilização**: Modelos podem ser usados por diferentes views
- **Testabilidade**: Facilita testes unitários dos componentes
- **Manutenibilidade**: Mudanças em uma camada não afetam as outras

### Implementação Frontend em Angular v19

#### Estrutura do Projeto Angular
```
src/app/
├── models/           # Models
├── services/         # Services (lógica de negócio)
├── components/       # Components (Views + Controllers)
└── shared/          # Componentes compartilhados
```

#### Model (TypeScript)
```typescript
// src/app/models/aluno.model.ts
export interface Aluno {
  id?: number;
  nome: string;
  matricula: string;
  notas?: Nota[];
}

export interface Nota {
  id?: number;
  valor: number;
  disciplina: string;
  alunoId?: number;
}

export interface NotaRequest {
  disciplina: string;
  valor: number;
}
```

#### Service (Lógica de Negócio)
```typescript
// src/app/services/aluno.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Aluno, NotaRequest } from '../models/aluno.model';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {
  private apiUrl = 'http://localhost:8080/api/alunos';

  constructor(private http: HttpClient) { }

  listarAlunos(): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(this.apiUrl);
  }

  criarAluno(aluno: Aluno): Observable<Aluno> {
    return this.http.post<Aluno>(this.apiUrl, aluno);
  }

  lancarNota(alunoId: number, nota: NotaRequest): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${alunoId}/notas`, nota);
  }

  validarNota(valor: number): boolean {
    return valor >= 0 && valor <= 10;
  }
}
```

#### Component (View + Controller)
```typescript
// src/app/components/aluno-lista/aluno-lista.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlunoService } from '../../services/aluno.service';
import { Aluno, NotaRequest } from '../../models/aluno.model';

@Component({
  selector: 'app-aluno-lista',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="container">
      <h2>Sistema Acadêmico</h2>
      
      <!-- Formulário para criar aluno -->
      <div class="card mb-4">
        <div class="card-header">
          <h4>Cadastrar Novo Aluno</h4>
        </div>
        <div class="card-body">
          <form [formGroup]="alunoForm" (ngSubmit)="criarAluno()">
            <div class="row">
              <div class="col-md-6">
                <label for="nome" class="form-label">Nome:</label>
                <input 
                  type="text" 
                  id="nome"
                  class="form-control"
                  formControlName="nome"
                  [class.is-invalid]="alunoForm.get('nome')?.invalid && alunoForm.get('nome')?.touched">
                <div class="invalid-feedback">Nome é obrigatório</div>
              </div>
              <div class="col-md-6">
                <label for="matricula" class="form-label">Matrícula:</label>
                <input 
                  type="text" 
                  id="matricula"
                  class="form-control"
                  formControlName="matricula"
                  [class.is-invalid]="alunoForm.get('matricula')?.invalid && alunoForm.get('matricula')?.touched">
                <div class="invalid-feedback">Matrícula é obrigatória</div>
              </div>
            </div>
            <button type="submit" class="btn btn-primary mt-3" [disabled]="alunoForm.invalid">
              Cadastrar Aluno
            </button>
          </form>
        </div>
      </div>

      <!-- Lista de alunos -->
      <div class="card">
        <div class="card-header">
          <h4>Lista de Alunos</h4>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Matrícula</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let aluno of alunos">
                  <td>{{ aluno.id }}</td>
                  <td>{{ aluno.nome }}</td>
                  <td>{{ aluno.matricula }}</td>
                  <td>
                    <button 
                      class="btn btn-sm btn-success"
                      (click)="abrirModalNota(aluno)">
                      Lançar Nota
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Modal para lançar nota -->
      <div class="modal fade" [class.show]="showModal" [style.display]="showModal ? 'block' : 'none'">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Lançar Nota - {{ alunoSelecionado?.nome }}</h5>
              <button type="button" class="btn-close" (click)="fecharModal()"></button>
            </div>
            <div class="modal-body">
              <form [formGroup]="notaForm" (ngSubmit)="lancarNota()">
                <div class="mb-3">
                  <label for="disciplina" class="form-label">Disciplina:</label>
                  <input 
                    type="text" 
                    id="disciplina"
                    class="form-control"
                    formControlName="disciplina"
                    [class.is-invalid]="notaForm.get('disciplina')?.invalid && notaForm.get('disciplina')?.touched">
                  <div class="invalid-feedback">Disciplina é obrigatória</div>
                </div>
                <div class="mb-3">
                  <label for="valor" class="form-label">Nota (0-10):</label>
                  <input 
                    type="number" 
                    id="valor"
                    class="form-control"
                    formControlName="valor"
                    min="0" 
                    max="10" 
                    step="0.1"
                    [class.is-invalid]="notaForm.get('valor')?.invalid && notaForm.get('valor')?.touched">
                  <div class="invalid-feedback">Nota deve estar entre 0 e 10</div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" (click)="fecharModal()">Cancelar</button>
                  <button type="submit" class="btn btn-primary" [disabled]="notaForm.invalid">Lançar Nota</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Backdrop do modal -->
      <div class="modal-backdrop fade show" *ngIf="showModal" (click)="fecharModal()"></div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    .card {
      margin-bottom: 20px;
      border: 1px solid #dee2e6;
      border-radius: 0.375rem;
    }
    .card-header {
      background-color: #f8f9fa;
      padding: 1rem;
      border-bottom: 1px solid #dee2e6;
    }
    .modal {
      background-color: rgba(0,0,0,0.5);
    }
    .modal.show {
      display: block !important;
    }
  `]
})
export class AlunoListaComponent implements OnInit {
  alunos: Aluno[] = [];
  alunoForm: FormGroup;
  notaForm: FormGroup;
  showModal = false;
  alunoSelecionado: Aluno | null = null;

  constructor(
    private alunoService: AlunoService,
    private formBuilder: FormBuilder
  ) {
    this.alunoForm = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(2)]],
      matricula: ['', [Validators.required]]
    });

    this.notaForm = this.formBuilder.group({
      disciplina: ['', [Validators.required]],
      valor: ['', [Validators.required, Validators.min(0), Validators.max(10)]]
    });
  }

  ngOnInit(): void {
    this.carregarAlunos();
  }

  carregarAlunos(): void {
    this.alunoService.listarAlunos().subscribe({
      next: (alunos) => {
        this.alunos = alunos;
      },
      error: (error) => {
        console.error('Erro ao carregar alunos:', error);
        alert('Erro ao carregar alunos');
      }
    });
  }

  criarAluno(): void {
    if (this.alunoForm.valid) {
      const novoAluno: Aluno = this.alunoForm.value;
      
      this.alunoService.criarAluno(novoAluno).subscribe({
        next: (aluno) => {
          this.alunos.push(aluno);
          this.alunoForm.reset();
          alert('Aluno cadastrado com sucesso!');
        },
        error: (error) => {
          console.error('Erro ao criar aluno:', error);
          alert('Erro ao cadastrar aluno');
        }
      });
    }
  }

  abrirModalNota(aluno: Aluno): void {
    this.alunoSelecionado = aluno;
    this.showModal = true;
    this.notaForm.reset();
  }

  fecharModal(): void {
    this.showModal = false;
    this.alunoSelecionado = null;
  }

  lancarNota(): void {
    if (this.notaForm.valid && this.alunoSelecionado?.id) {
      const notaRequest: NotaRequest = this.notaForm.value;
      
      this.alunoService.lancarNota(this.alunoSelecionado.id, notaRequest).subscribe({
        next: () => {
          alert('Nota lançada com sucesso!');
          this.fecharModal();
        },
        error: (error) => {
          console.error('Erro ao lançar nota:', error);
          alert('Erro ao lançar nota');
        }
      });
    }
  }
}
```

#### Configuração do Bootstrap no Angular
```typescript
// src/app/app.component.ts
import { Component } from '@angular/core';
import { AlunoListaComponent } from './components/aluno-lista/aluno-lista.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AlunoListaComponent],
  template: `
    <app-aluno-lista></app-aluno-lista>
  `
})
export class AppComponent {
  title = 'sistema-academico';
}
```

---

## 4. Microsserviços

### Conceito

Microsserviços são um instrumento para garantir que os times de desenvolvimento somente usem interfaces públicas de outros sistemas, com módulos executados em processos independentes, sem compartilhamento de memória.

### Motivação

- **Agilidade**: Times podem evoluir independentemente
- **Escalabilidade**: Escalar apenas os serviços necessários
- **Tecnologias**: Cada serviço pode usar tecnologias diferentes
- **Falhas parciais**: Sistema não para completamente

### Desafios dos Microsserviços

Microsserviços são mais complexos que arquiteturas monolíticas, envolvendo todos os desafios de sistemas distribuídos: complexidade de comunicação, latência de rede e transações distribuídas.

### Exemplo: E-commerce com Microsserviços

#### Serviço de Produtos (Spring Boot)
```java
// ProductService - Microsserviço independente
@SpringBootApplication
@EnableEurekaClient
public class ProductServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(ProductServiceApplication.class, args);
    }
}

@RestController
@RequestMapping("/api/products")
public class ProductController {
    
    @Autowired
    private ProductService productService;
    
    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productService.findAll());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProduct(@PathVariable Long id) {
        return productService.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
}
```

#### Serviço de Pedidos (Spring Boot)
```java
// OrderService - Microsserviço independente
@RestController
@RequestMapping("/api/orders")
public class OrderController {
    
    @Autowired
    private OrderService orderService;
    
    @Autowired
    private ProductClient productClient; // Cliente para comunicação
    
    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody CreateOrderRequest request) {
        // Verifica se produto existe chamando outro microsserviço
        Product product = productClient.getProduct(request.getProductId());
        if (product == null) {
            return ResponseEntity.badRequest().build();
        }
        
        Order order = orderService.createOrder(request);
        return ResponseEntity.ok(order);
    }
}

// Cliente Feign para comunicação entre microsserviços
@FeignClient(name = "product-service")
public interface ProductClient {
    @GetMapping("/api/products/{id}")
    Product getProduct(@PathVariable("id") Long id);
}
```

#### Gateway API (Spring Cloud Gateway)
```yaml
# application.yml - API Gateway
spring:
  cloud:
    gateway:
      routes:
        - id: product-service
          uri: lb://product-service
          predicates:
            - Path=/api/products/**
        - id: order-service
          uri: lb://order-service
          predicates:
            - Path=/api/orders/**
```

---

## 5. Arquitetura Orientada a Mensagens

### Filas de Mensagens

A comunicação entre clientes e servidores é mediada por um terceiro serviço que tem a única função de prover uma fila de mensagens, oferecendo desacoplamento no espaço e no tempo.

### Vantagens

- **Desacoplamento no espaço**: Clientes não conhecem servidores
- **Desacoplamento no tempo**: Não precisam estar simultaneamente disponíveis
- **Escalabilidade**: Múltiplos consumidores podem processar mensagens

### Exemplo com RabbitMQ

#### Configuração Spring Boot
```java
// Configuração do RabbitMQ
@Configuration
@EnableRabbit
public class RabbitConfig {
    
    public static final String QUEUE_ORDERS = "orders.queue";
    public static final String EXCHANGE_ORDERS = "orders.exchange";
    public static final String ROUTING_KEY_ORDERS = "orders.new";
    
    @Bean
    public Queue ordersQueue() {
        return QueueBuilder.durable(QUEUE_ORDERS).build();
    }
    
    @Bean
    public TopicExchange ordersExchange() {
        return new TopicExchange(EXCHANGE_ORDERS);
    }
    
    @Bean
    public Binding ordersBinding() {
        return BindingBuilder
            .bind(ordersQueue())
            .to(ordersExchange())
            .with(ROUTING_KEY_ORDERS);
    }
}

// Produtor de mensagens
@Service
public class OrderMessageProducer {
    
    @Autowired
    private RabbitTemplate rabbitTemplate;
    
    public void sendOrderCreated(Order order) {
        OrderMessage message = new OrderMessage(
            order.getId(),
            order.getCustomerId(),
            order.getProductId(),
            order.getQuantity(),
            order.getTotal()
        );
        
        rabbitTemplate.convertAndSend(
            RabbitConfig.EXCHANGE_ORDERS,
            RabbitConfig.ROUTING_KEY_ORDERS,
            message
        );
    }
}

// Consumidor de mensagens
@Component
public class OrderMessageConsumer {
    
    @RabbitListener(queues = RabbitConfig.QUEUE_ORDERS)
    public void handleOrderCreated(OrderMessage message) {
        System.out.println("Processando pedido: " + message.getOrderId());
        
        // Processar pedido (enviar email, atualizar estoque, etc.)
        processOrder(message);
    }
    
    private void processOrder(OrderMessage message) {
        // Lógica de processamento do pedido
        // Por exemplo: enviar email de confirmação
        emailService.sendOrderConfirmation(message);
        
        // Atualizar estoque
        inventoryService.updateStock(message.getProductId(), message.getQuantity());
    }
}
```

### Publish/Subscribe

Em arquiteturas publish/subscribe, um evento gera notificações em todos os seus assinantes, oferecendo comunicação de 1 para n, também conhecida como comunicação em grupo.

#### Exemplo com Spring Events
```java
// Evento de domínio
public class OrderCreatedEvent {
    private final Long orderId;
    private final Long customerId;
    private final BigDecimal total;
    
    public OrderCreatedEvent(Long orderId, Long customerId, BigDecimal total) {
        this.orderId = orderId;
        this.customerId = customerId;
        this.total = total;
    }
    
    // Getters
}

// Publisher
@Service
public class OrderService {
    
    @Autowired
    private ApplicationEventPublisher eventPublisher;
    
    public Order createOrder(CreateOrderRequest request) {
        Order order = new Order(request);
        order = orderRepository.save(order);
        
        // Publica evento
        eventPublisher.publishEvent(
            new OrderCreatedEvent(order.getId(), order.getCustomerId(), order.getTotal())
        );
        
        return order;
    }
}

// Subscribers
@Component
public class EmailNotificationHandler {
    
    @EventListener
    @Async
    public void handleOrderCreated(OrderCreatedEvent event) {
        // Enviar email de confirmação
        emailService.sendOrderConfirmation(event.getOrderId());
    }
}

@Component
public class InventoryUpdateHandler {
    
    @EventListener
    @Async
    public void handleOrderCreated(OrderCreatedEvent event) {
        // Atualizar estoque
        inventoryService.processOrder(event.getOrderId());
    }
}

@Component
public class LoyaltyPointsHandler {
    
    @EventListener
    @Async
    public void handleOrderCreated(OrderCreatedEvent event) {
        // Adicionar pontos de fidelidade
        loyaltyService.addPoints(event.getCustomerId(), event.getTotal());
    }
}
```

---

## 6. Anti-padrão: Big Ball of Mud

### O que é?

Big ball of mud descreve sistemas nos quais qualquer módulo comunica-se com praticamente qualquer outro módulo, sem uma arquitetura definida, resultando em um espaguete de código.

### Problemas

- **Manutenção difícil**: Mudanças causam efeitos colaterais inesperados
- **Tempo de aprendizado alto**: Novos desenvolvedores demoram para entender
- **Bugs recorrentes**: Correções introduzem novos problemas
- **Performance degradada**: Sistema fica lento com o tempo

### Como Evitar

1. **Defina arquitetura clara**: Estabeleça camadas e responsabilidades
2. **Controle dependências**: Use ferramentas de análise de código
3. **Refatoração contínua**: Melhore o código constantemente
4. **Testes automatizados**: Garanta que mudanças não quebrem funcionalidades
5. **Revisões de código**: Identifique problemas arquiteturais cedo

### Exemplo de Código Problemático (Big Ball of Mud)
```java
// ❌ Exemplo de código mal estruturado
@Controller
public class SystemController {
    
    // Mistura apresentação, negócio e persistência
    @RequestMapping("/processOrder")
    public String processOrder(HttpServletRequest request) {
        // Acesso direto ao banco
        Connection conn = DriverManager.getConnection("jdbc:mysql://...");
        
        // Lógica de negócio misturada
        String customerId = request.getParameter("customerId");
        String productId = request.getParameter("productId");
        double price = Double.parseDouble(request.getParameter("price"));
        
        // Validação misturada
        if (price < 0) return "error";
        
        // SQL direto no controller
        PreparedStatement stmt = conn.prepareStatement(
            "INSERT INTO orders (customer_id, product_id, price) VALUES (?, ?, ?)"
        );
        stmt.setString(1, customerId);
        stmt.setString(2, productId);
        stmt.setDouble(3, price);
        stmt.executeUpdate();
        
        // Email direto no controller
        sendEmail(customerId, "Order confirmed");
        
        return "success";
    }
    
    private void sendEmail(String customerId, String message) {
        // Implementação de email misturada
    }
}
```

### Refatoração para Arquitetura Limpa
```java
// ✅ Versão refatorada seguindo arquitetura em camadas

// Camada de Apresentação
@RestController
@RequestMapping("/api/orders")
public class OrderController {
    
    private final OrderService orderService;
    
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }
    
    @PostMapping
    public ResponseEntity<OrderResponse> createOrder(@RequestBody CreateOrderRequest request) {
        try {
            Order order = orderService.createOrder(request);
            return ResponseEntity.ok(OrderResponse.from(order));
        } catch (ValidationException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}

// Camada de Negócio
@Service
@Transactional
public class OrderService {
    
    private final OrderRepository orderRepository;
    private final EmailService emailService;
    private final OrderValidator orderValidator;
    
    public OrderService(OrderRepository orderRepository, 
                       EmailService emailService,
                       OrderValidator orderValidator) {
        this.orderRepository = orderRepository;
        this.emailService = emailService;
        this.orderValidator = orderValidator;
    }
    
    public Order createOrder(CreateOrderRequest request) {
        // Validação
        orderValidator.validate(request);
        
        // Criação do pedido
        Order order = Order.builder()
            .customerId(request.getCustomerId())
            .productId(request.getProductId())
            .price(request.getPrice())
            .status(OrderStatus.PENDING)
            .build();
        
        // Persistência
        order = orderRepository.save(order);
        
        // Notificação
        emailService.sendOrderConfirmation(order);
        
        return order;
    }
}

// Camada de Persistência
@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByCustomerId(String customerId);
    List<Order> findByStatus(OrderStatus status);
}
```

---

## 7. Single Page Applications (SPAs) e MVC Moderno

### Conceito

SPAs carregam para o navegador todo o código necessário, incluindo páginas HTML e scripts, proporcionando uma experiência mais interativa e responsiva, similar a aplicações desktop.

### Implementação com Angular v19

#### Componente Principal da SPA
```typescript
// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  template: `
    <app-navbar></app-navbar>
    <main class="container-fluid">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    main {
      padding-top: 80px;
      min-height: 100vh;
    }
  `]
})
export class AppComponent {
  title = 'Sistema Acadêmico SPA';
}
```

#### Roteamento da SPA
```typescript
// src/app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: '', 
    redirectTo: '/alunos', 
    pathMatch: 'full' 
  },
  { 
    path: 'alunos', 
    loadComponent: () => import('./components/aluno-lista/aluno-lista.component')
      .then(c => c.AlunoListaComponent)
  },
  { 
    path: 'alunos/:id', 
    loadComponent: () => import('./components/aluno-detalhes/aluno-detalhes.component')
      .then(c => c.AlunoDetalhesComponent)
  },
  { 
    path: 'notas', 
    loadComponent: () => import('./components/nota-lista/nota-lista.component')
      .then(c => c.NotaListaComponent)
  },
  { 
    path: '**', 
    loadComponent: () => import('./components/not-found/not-found.component')
      .then(c => c.NotFoundComponent)
  }
];
```

#### Navbar Component
```typescript
// src/app/shared/navbar/navbar.component.ts
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <div class="container">
        <a class="navbar-brand" routerLink="/">
          <i class="fas fa-graduation-cap me-2"></i>
          Sistema Acadêmico
        </a>
        
        <button class="navbar-toggler" type="button" (click)="toggleNavbar()">
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="navbar-collapse" [class.collapse]="!isNavbarCollapsed">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <a class="nav-link" routerLink="/alunos" routerLinkActive="active">
                <i class="fas fa-users me-1"></i>
                Alunos
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/notas" routerLinkActive="active">
                <i class="fas fa-chart-line me-1"></i>
                Notas
              </a>
            </li>
          </ul>
          
          <ul class="navbar-nav">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" 
                 (click)="toggleDropdown()" [class.show]="isDropdownOpen">
                <i class="fas fa-user me-1"></i>
                Usuário
              </a>
              <ul class="dropdown-menu dropdown-menu-end" [class.show]="isDropdownOpen">
                <li><a class="dropdown-item" href="#"><i class="fas fa-cog me-2"></i>Configurações</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#"><i class="fas fa-sign-out-alt me-2"></i>Sair</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar-brand {
      font-weight: bold;
      font-size: 1.5rem;
    }
    
    .nav-link {
      transition: all 0.3s ease;
    }
    
    .nav-link:hover {
      transform: translateY(-2px);
    }
    
    .nav-link.active {
      background-color: rgba(255, 255, 255, 0.1);
      border-radius: 0.375rem;
    }
    
    .dropdown-menu {
      border: none;
      box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
    }
  `]
})
export class NavbarComponent {
  isNavbarCollapsed = true;
  isDropdownOpen = false;

  toggleNavbar(): void {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
```

#### Serviço de Estado Global
```typescript
// src/app/services/app-state.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Aluno } from '../models/aluno.model';

export interface AppState {
  alunos: Aluno[];
  loading: boolean;
  error: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  private initialState: AppState = {
    alunos: [],
    loading: false,
    error: null
  };

  private stateSubject = new BehaviorSubject<AppState>(this.initialState);
  public state$ = this.stateSubject.asObservable();

  get currentState(): AppState {
    return this.stateSubject.value;
  }

  updateState(partialState: Partial<AppState>): void {
    const newState = { ...this.currentState, ...partialState };
    this.stateSubject.next(newState);
  }

  // Métodos específicos
  setLoading(loading: boolean): void {
    this.updateState({ loading });
  }

  setError(error: string | null): void {
    this.updateState({ error });
  }

  setAlunos(alunos: Aluno[]): void {
    this.updateState({ alunos });
  }

  addAluno(aluno: Aluno): void {
    const alunos = [...this.currentState.alunos, aluno];
    this.updateState({ alunos });
  }

  updateAluno(alunoAtualizado: Aluno): void {
    const alunos = this.currentState.alunos.map(aluno => 
      aluno.id === alunoAtualizado.id ? alunoAtualizado : aluno
    );
    this.updateState({ alunos });
  }
}
```

---

## 8. Boas Práticas e Considerações Finais

### Princípios SOLID na Arquitetura

#### Single Responsibility Principle (SRP)
```java
// ❌ Violação do SRP - Classe faz muitas coisas
public class UserManager {
    public void createUser(User user) { /* criar usuário */ }
    public void sendEmail(String email) { /* enviar email */ }
    public void logActivity(String activity) { /* log */ }
}

// ✅ Separação de responsabilidades
@Service
public class UserService {
    public User createUser(CreateUserRequest request) {
        // Apenas criação de usuários
    }
}

@Service
public class EmailService {
    public void sendWelcomeEmail(User user) {
        // Apenas envio de emails
    }
}

@Service
public class ActivityLogService {
    public void logUserCreation(User user) {
        // Apenas logging
    }
}
```

#### Dependency Inversion Principle (DIP)
```java
// ✅ Dependência de abstrações, não de implementações
public interface PaymentProcessor {
    void processPayment(Payment payment);
}

@Service
public class OrderService {
    private final PaymentProcessor paymentProcessor;
    
    public OrderService(PaymentProcessor paymentProcessor) {
        this.paymentProcessor = paymentProcessor;
    }
    
    public void processOrder(Order order) {
        // Lógica do pedido
        paymentProcessor.processPayment(order.getPayment());
    }
}

// Implementações específicas
@Component
public class CreditCardProcessor implements PaymentProcessor {
    public void processPayment(Payment payment) {
        // Processamento de cartão de crédito
    }
}

@Component  
public class PayPalProcessor implements PaymentProcessor {
    public void processPayment(Payment payment) {
        // Processamento PayPal
    }
}
```

### Monitoramento e Observabilidade

#### Configuração de Métricas (Spring Boot)
```java
// src/main/java/com/exemplo/config/MetricsConfig.java
@Configuration
@EnablePrometheusEndpoint
public class MetricsConfig {
    
    @Bean
    public TimedAspect timedAspect(MeterRegistry registry) {
        return new TimedAspect(registry);
    }
    
    @Bean
    public CounterService counterService(MeterRegistry meterRegistry) {
        return new CounterService(meterRegistry);
    }
}

// Uso de métricas nos serviços
@Service
public class AlunoService {
    
    private final Counter alunosCriadosCounter;
    private final Timer tempoProcessamentoTimer;
    
    public AlunoService(MeterRegistry meterRegistry) {
        this.alunosCriadosCounter = Counter.builder("alunos.criados")
            .description("Total de alunos criados")
            .register(meterRegistry);
            
        this.tempoProcessamentoTimer = Timer.builder("aluno.processamento.tempo")
            .description("Tempo de processamento de alunos")
            .register(meterRegistry);
    }
    
    @Timed(name = "aluno.criacao", description = "Tempo para criar aluno")
    public Aluno criarAluno(Aluno aluno) {
        return Timer.Sample.start(tempoProcessamentoTimer)
            .stop(() -> {
                Aluno novoAluno = alunoRepository.save(aluno);
                alunosCriadosCounter.increment();
                return novoAluno;
            });
    }
}
```

### Testes de Arquitetura

#### ArchUnit para Validar Arquitetura
```java
// src/test/java/com/exemplo/ArchitectureTest.java
public class ArchitectureTest {
    
    @Test
    public void servicesShouldNotDependOnControllers() {
        noClasses()
            .that().resideInAPackage("..service..")
            .should().dependOnClassesThat()
            .resideInAPackage("..controller..")
            .check(classes);
    }
    
    @Test
    public void servicesShouldBeAnnotatedWithService() {
        classes()
            .that().resideInAPackage("..service..")
            .and().areNotInterfaces()
            .should().beAnnotatedWith(Service.class)
            .check(classes);
    }
    
    @Test
    public void repositoriesShouldOnlyBeAccessedByServices() {
        noClasses()
            .that().resideOutsideOfPackage("..service..")
            .should().dependOnClassesThat()
            .resideInAPackage("..repository..")
            .check(classes);
    }
    
    @Test
    public void layerDependencyIsRespected() {
        layeredArchitecture()
            .layer("Controller").definedBy("..controller..")
            .layer("Service").definedBy("..service..")
            .layer("Repository").definedBy("..repository..")
            .whereLayer("Controller").mayNotBeAccessedByAnyLayer()
            .whereLayer("Service").mayOnlyBeAccessedByLayers("Controller")
            .whereLayer("Repository").mayOnlyBeAccessedByLayers("Service")
            .check(classes);
    }
}
```

### Configuração Docker para Microsserviços

#### Docker Compose
```yaml
# docker-compose.yml
version: '3.8'

services:
  # Banco de dados
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: academico
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: senha123
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  # Redis para cache
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  # RabbitMQ para mensagens
  rabbitmq:
    image: rabbitmq:3-management
    environment:
      RABBITMQ_DEFAULT_USER: admin
      RABBITMQ_DEFAULT_PASS: senha123
    ports:
      - "5672:5672"
      - "15672:15672"

  # Serviço de Alunos
  aluno-service:
    build: ./aluno-service
    environment:
      SPRING_DATASOURCE_URL: jdbc:postgresql://postgres:5432/academico
      SPRING_DATASOURCE_USERNAME: admin
      SPRING_DATASOURCE_PASSWORD: senha123
      SPRING_REDIS_HOST: redis
      SPRING_RABBITMQ_HOST: rabbitmq
    ports:
      - "8081:8080"
    depends_on:
      - postgres
      - redis
      - rabbitmq

  # Serviço de Notas  
  nota-service:
    build: ./nota-service
    environment:
      SPRING_DATASOURCE_URL: jdbc:postgresql://postgres:5432/academico
      SPRING_DATASOURCE_USERNAME: admin
      SPRING_DATASOURCE_PASSWORD: senha123
    ports:
      - "8082:8080"
    depends_on:
      - postgres

  # API Gateway
  api-gateway:
    build: ./api-gateway
    ports:
      - "8080:8080"
    depends_on:
      - aluno-service
      - nota-service

  # Frontend Angular
  frontend:
    build: ./frontend
    ports:
      - "4200:80"
    depends_on:
      - api-gateway

volumes:
  postgres_data:
```

### Resumo dos Padrões Estudados

| Padrão | Quando Usar | Vantagens | Desvantagens |
|--------|-------------|-----------|--------------|
| **Camadas** | Sistemas de informação tradicionais | Separação clara, fácil entendimento | Pode criar overhead |
| **MVC** | Aplicações com interface gráfica | Separação apresentação/lógica | Pode ficar complexo |
| **Microsserviços** | Systems grandes, times distribuídos | Escalabilidade, tecnologias diversas | Complexidade de rede |
| **Mensagens** | Sistemas distribuídos, desacoplamento | Assíncrono, tolerante a falhas | Complexidade adicional |
| **Publish/Subscribe** | Eventos, notificações | Comunicação 1:N, flexível | Debugging mais difícil |

### Exercícios Práticos

1. **Refatore um monolito**: Identifique um sistema monolítico e proponha uma divisão em microsserviços
2. **Implemente MVC**: Crie uma aplicação simples seguindo o padrão MVC
3. **Configure mensageria**: Implemente comunicação assíncrona entre dois serviços
4. **Teste arquitetura**: Use ArchUnit para validar regras arquiteturais
5. **Monitoramento**: Configure métricas e logs para uma aplicação

### Recursos Adicionais

- **Livros**: "Building Microservices" por Sam Newman, "Clean Architecture" por Robert Martin
- **Ferramentas**: Docker, Kubernetes, Spring Cloud, Netflix OSS
- **Monitoramento**: Prometheus, Grafana, ELK Stack
- **Testes**: ArchUnit, TestContainers, WireMock

---

## Conclusão

A arquitetura de software é fundamental para o sucesso de qualquer sistema. Cada padrão tem seu lugar e deve ser escolhido baseado no contexto específico do projeto. A evolução de monolitos para microsserviços, quando bem executada, pode trazer grandes benefícios, mas também adiciona complexidade que deve ser cuidadosamente gerenciada.

O importante é entender que não existe uma "bala de prata" - cada arquitetura tem seus trade-offs, e a escolha certa depende dos requisitos específicos, tamanho da equipe, experiência técnica e contexto organizacional.