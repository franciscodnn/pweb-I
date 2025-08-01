[main](../../README.md)

# Aula 14 - Injeção de Dependência e Inversão de Controle no Spring Boot 3.5

## 1. Conceitos Fundamentais

### O que é Inversão de Controle (IoC)?

**Inversão de Controle** é um princípio de design onde o controle da criação e gerenciamento de objetos é transferido do código da aplicação para um framework externo (no caso, o Spring).

**Antes (sem IoC):**
```java
public class PedidoService {
    private EmailService emailService;
    
    public PedidoService() {
        // A classe cria suas próprias dependências
        this.emailService = new EmailService();
    }
}
```

**Depois (com IoC):**
```java
@Service
public class PedidoService {
    private final EmailService emailService;
    
    // O Spring injeta a dependência
    public PedidoService(EmailService emailService) {
        this.emailService = emailService;
    }
}
```

### O que é Injeção de Dependência (DI)?

**Injeção de Dependência** (padrão de projeto) é o mecanismo pelo qual o Spring implementa a Inversão de Controle. É o processo de fornecer as dependências que um objeto precisa, em vez de deixar o objeto criar essas dependências por si mesmo.

### Vantagens da DI/IoC

- **Baixo Acoplamento**: Classes não dependem de implementações concretas
- **Alta Testabilidade**: Fácil criação de mocks e testes unitários
- **Flexibilidade**: Fácil troca de implementações
- **Reutilização**: Componentes podem ser reutilizados em diferentes contextos
- **Manutenibilidade**: Código mais limpo e organizado

---

## 2. O que são Beans no Spring?

### Definição

**Bean** é um objeto que é instanciado, montado e gerenciado pelo container IoC do Spring. Os beans são o backbone de uma aplicação Spring.

### Características dos Beans

- **Gerenciamento de Ciclo de Vida**: Spring controla quando criar, configurar e destruir
- **Singleton por Padrão**: Uma única instância por contexto da aplicação
- **Injeção Automática**: Spring injeta dependências automaticamente
- **Configuração Flexível**: Podem ser configurados via anotações ou XML

### Exemplo Básico de Bean

```java
// Esta classe será um Bean gerenciado pelo Spring
@Component
public class CalculadoraService {
    
    public double somar(double a, double b) {
        return a + b;
    }
    
    public double multiplicar(double a, double b) {
        return a * b;
    }
}
```

---

## 3. Tipos de Injeção de Dependência

### 3.1 Injeção por Construtor (Recomendada)

```java
@Service
public class ProdutoService {
    
    private final ProdutoRepository produtoRepository;
    private final EmailService emailService;
    
    // Injeção por construtor - RECOMENDADA
    public ProdutoService(ProdutoRepository produtoRepository, 
                         EmailService emailService) {
        this.produtoRepository = produtoRepository;
        this.emailService = emailService;
    }
    
    public Produto salvarProduto(Produto produto) {
        Produto produtoSalvo = produtoRepository.save(produto);
        emailService.enviarNotificacao("Produto criado: " + produto.getNome());
        return produtoSalvo;
    }
}
```

**Vantagens:**
- Dependências obrigatórias
- Imutabilidade (final fields)
- Falha rápida se dependência não estiver disponível
- Facilita testes unitários

### 3.2 Injeção por Campo (@Autowired)

```java
@Service
public class ClienteService {
    
    // Injeção por campo - NÃO RECOMENDADA
    @Autowired
    private ClienteRepository clienteRepository;
    
    @Autowired
    private EmailService emailService;
    
    public Cliente criarCliente(Cliente cliente) {
        Cliente clienteSalvo = clienteRepository.save(cliente);
        emailService.enviarBoasVindas(cliente.getEmail());
        return clienteSalvo;
    }
}
```

**Desvantagens:**
- Dificulta testes unitários
- Não garante imutabilidade
- Violação do encapsulamento
- Dependência oculta do Spring

### 3.3 Injeção por Setter

```java
@Service
public class RelatorioService {
    
    private EmailService emailService;
    private ArquivoService arquivoService;
    
    // Injeção por setter - dependências opcionais
    @Autowired
    public void setEmailService(EmailService emailService) {
        this.emailService = emailService;
    }
    
    @Autowired
    public void setArquivoService(ArquivoService arquivoService) {
        this.arquivoService = arquivoService;
    }
    
    public void gerarRelatorio() {
        String relatorio = "Relatório gerado...";
        
        if (arquivoService != null) {
            arquivoService.salvarArquivo(relatorio);
        }
        
        if (emailService != null) {
            emailService.enviarRelatorio(relatorio);
        }
    }
}
```

---

## 4. Anotações para Criação de Beans

### 4.1 @Component (Anotação Genérica)

```java
// Componente genérico
@Component
public class UtilsHelper {
    
    public String formatarTexto(String texto) {
        return texto.trim().toLowerCase();
    }
    
    public boolean isValidEmail(String email) {
        return email.contains("@") && email.contains(".");
    }
}
```

### 4.2 @Service (Camada de Negócio)

```java
// Componente de serviço - lógica de negócio
@Service
public class ContaService {
    
    private final ContaRepository contaRepository;
    private final EmailService emailService;
    
    public ContaService(ContaRepository contaRepository, EmailService emailService) {
        this.contaRepository = contaRepository;
        this.emailService = emailService;
    }
    
    public void transferir(Long contaOrigemId, Long contaDestinoId, BigDecimal valor) {
        // Regras de negócio
        if (valor.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Valor deve ser positivo");
        }
        
        Conta contaOrigem = contaRepository.findById(contaOrigemId)
            .orElseThrow(() -> new RuntimeException("Conta origem não encontrada"));
            
        Conta contaDestino = contaRepository.findById(contaDestinoId)
            .orElseThrow(() -> new RuntimeException("Conta destino não encontrada"));
        
        if (contaOrigem.getSaldo().compareTo(valor) < 0) {
            throw new RuntimeException("Saldo insuficiente");
        }
        
        // Executar transferência
        contaOrigem.debitar(valor);
        contaDestino.creditar(valor);
        
        contaRepository.save(contaOrigem);
        contaRepository.save(contaDestino);
        
        // Enviar notificação
        emailService.enviarNotificacaoTransferencia(contaOrigem, contaDestino, valor);
    }
}
```

### 4.3 @Repository (Camada de Persistência)

```java
// Componente de repositório - acesso a dados
@Repository
public class ProdutoRepositoryImpl implements ProdutoRepositoryCustom {
    
    private final EntityManager entityManager;
    
    public ProdutoRepositoryImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }
    
    @Override
    public List<Produto> buscarProdutosPorFiltro(String nome, BigDecimal precoMinimo) {
        StringBuilder jpql = new StringBuilder("SELECT p FROM Produto p WHERE 1=1");
        
        if (nome != null && !nome.trim().isEmpty()) {
            jpql.append(" AND p.nome LIKE :nome");
        }
        
        if (precoMinimo != null) {
            jpql.append(" AND p.preco >= :precoMinimo");
        }
        
        TypedQuery<Produto> query = entityManager.createQuery(jpql.toString(), Produto.class);
        
        if (nome != null && !nome.trim().isEmpty()) {
            query.setParameter("nome", "%" + nome + "%");
        }
        
        if (precoMinimo != null) {
            query.setParameter("precoMinimo", precoMinimo);
        }
        
        return query.getResultList();
    }
}
```

### 4.4 @Controller (Camada de Apresentação)

```java
// Componente de controle - interface web
@Controller
public class ProdutoController {
    
    private final ProdutoService produtoService;
    
    public ProdutoController(ProdutoService produtoService) {
        this.produtoService = produtoService;
    }
    
    @GetMapping("/produtos")
    public String listarProdutos(Model model) {
        List<Produto> produtos = produtoService.listarTodos();
        model.addAttribute("produtos", produtos);
        return "produtos/lista";
    }
    
    @PostMapping("/produtos")
    public String criarProduto(@ModelAttribute Produto produto, RedirectAttributes attributes) {
        try {
            produtoService.salvarProduto(produto);
            attributes.addFlashAttribute("sucesso", "Produto criado com sucesso!");
        } catch (Exception e) {
            attributes.addFlashAttribute("erro", "Erro ao criar produto: " + e.getMessage());
        }
        
        return "redirect:/produtos";
    }
}
```

### 4.5 @RestController (API REST)

```java
// Componente REST - API JSON
@RestController
@RequestMapping("/api/usuarios")
public class UsuarioRestController {
    
    private final UsuarioService usuarioService;
    
    public UsuarioRestController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }
    
    @GetMapping
    public ResponseEntity<List<Usuario>> listarUsuarios() {
        List<Usuario> usuarios = usuarioService.listarTodos();
        return ResponseEntity.ok(usuarios);
    }
    
    @PostMapping
    public ResponseEntity<Usuario> criarUsuario(@RequestBody @Valid Usuario usuario) {
        try {
            Usuario usuarioCriado = usuarioService.criarUsuario(usuario);
            return ResponseEntity.status(HttpStatus.CREATED).body(usuarioCriado);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Usuario> buscarUsuario(@PathVariable Long id) {
        return usuarioService.buscarPorId(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Usuario> atualizarUsuario(@PathVariable Long id, 
                                                   @RequestBody @Valid Usuario usuario) {
        try {
            Usuario usuarioAtualizado = usuarioService.atualizarUsuario(id, usuario);
            return ResponseEntity.ok(usuarioAtualizado);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarUsuario(@PathVariable Long id) {
        try {
            usuarioService.deletarUsuario(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
```

---

## 5. Configuração de Beans com @Configuration

### 5.1 Classe de Configuração

```java
@Configuration
public class AppConfig {
    
    // Bean personalizado
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12);
    }
    
    // Bean condicional
    @Bean
    @ConditionalOnProperty(value = "app.email.enabled", havingValue = "true")
    public EmailService emailService() {
        return new SmtpEmailService();
    }
    
    // Bean com configuração personalizada
    @Bean
    public ObjectMapper objectMapper() {
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(JsonParser.Feature.ALLOW_COMMENTS, true);
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        mapper.registerModule(new JavaTimeModule());
        return mapper;
    }
    
    // Bean de cliente HTTP
    @Bean
    public RestTemplate restTemplate() {
        RestTemplate restTemplate = new RestTemplate();
        
        // Configurar timeout
        HttpComponentsClientHttpRequestFactory factory = 
            new HttpComponentsClientHttpRequestFactory();
        factory.setConnectTimeout(5000);
        factory.setReadTimeout(10000);
        
        restTemplate.setRequestFactory(factory);
        return restTemplate;
    }
}
```

### 5.2 Configuração de Banco de Dados

```java
@Configuration
@EnableJpaRepositories(basePackages = "com.exemplo.repository")
public class DatabaseConfig {
    
    @Bean
    @Primary
    @ConfigurationProperties("spring.datasource")
    public DataSource primaryDataSource() {
        return DataSourceBuilder.create().build();
    }
    
    @Bean
    @ConfigurationProperties("spring.datasource.secondary")
    public DataSource secondaryDataSource() {
        return DataSourceBuilder.create().build();
    }
    
    @Bean
    public LocalContainerEntityManagerFactoryBean entityManagerFactory(
            @Qualifier("primaryDataSource") DataSource dataSource) {
        
        LocalContainerEntityManagerFactoryBean em = 
            new LocalContainerEntityManagerFactoryBean();
        em.setDataSource(dataSource);
        em.setPackagesToScan("com.exemplo.model");
        
        HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
        vendorAdapter.setGenerateDdl(true);
        vendorAdapter.setShowSql(true);
        em.setJpaVendorAdapter(vendorAdapter);
        
        return em;
    }
}
```

---

## 6. Escopos de Beans

### 6.1 Singleton (Padrão)

```java
// Escopo Singleton - uma única instância por container
@Service
// @Scope("singleton") - é o padrão, não precisa declarar
public class ConfiguracaoService {
    
    private final Map<String, String> configuracoes = new HashMap<>();
    
    @PostConstruct
    public void init() {
        configuracoes.put("app.name", "Minha Aplicação");
        configuracoes.put("app.version", "1.0.0");
        System.out.println("ConfiguracaoService inicializado");
    }
    
    public String getConfiguracao(String chave) {
        return configuracoes.get(chave);
    }
}
```

### 6.2 Prototype

```java
// Escopo Prototype - nova instância a cada injeção
@Component
@Scope("prototype")
public class RelatorioGenerator {
    
    private final String id = UUID.randomUUID().toString();
    private final LocalDateTime criadoEm = LocalDateTime.now();
    
    public String gerarRelatorio(String titulo) {
        return String.format("Relatório: %s (ID: %s, Criado: %s)", 
                           titulo, id, criadoEm);
    }
    
    public String getId() {
        return id;
    }
}
```

### 6.3 Request (Web)

```java
// Escopo Request - uma instância por requisição HTTP
@Component
@Scope(value = WebApplicationContext.SCOPE_REQUEST, proxyMode = ScopedProxyMode.TARGET_CLASS)
public class RequestContext {
    
    private String userId;
    private String sessionId;
    private LocalDateTime requestTime;
    
    @PostConstruct
    public void init() {
        this.requestTime = LocalDateTime.now();
        this.sessionId = UUID.randomUUID().toString();
        System.out.println("Novo contexto de requisição criado");
    }
    
    // Getters e setters
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    
    public String getSessionId() { return sessionId; }
    public LocalDateTime getRequestTime() { return requestTime; }
}
```

### 6.4 Session (Web)

```java
// Escopo Session - uma instância por sessão HTTP
@Component
@Scope(value = WebApplicationContext.SCOPE_SESSION, proxyMode = ScopedProxyMode.TARGET_CLASS)
public class CarrinhoCompras {
    
    private final List<ItemCarrinho> itens = new ArrayList<>();
    private final String id = UUID.randomUUID().toString();
    
    public void adicionarItem(Produto produto, int quantidade) {
        ItemCarrinho item = new ItemCarrinho(produto, quantidade);
        itens.add(item);
    }
    
    public void removerItem(Long produtoId) {
        itens.removeIf(item -> item.getProduto().getId().equals(produtoId));
    }
    
    public BigDecimal calcularTotal() {
        return itens.stream()
            .map(item -> item.getProduto().getPreco().multiply(
                         BigDecimal.valueOf(item.getQuantidade())))
            .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
    
    public List<ItemCarrinho> getItens() {
        return new ArrayList<>(itens);
    }
    
    public void limpar() {
        itens.clear();
    }
    
    public String getId() {
        return id;
    }
}
```

---

## 7. Qualificadores (@Qualifier)

### 7.1 Múltiplas Implementações

```java
// Interface comum
public interface NotificationService {
    void enviarNotificacao(String destinatario, String mensagem);
}

// Implementação por Email
@Service
@Qualifier("email")
public class EmailNotificationService implements NotificationService {
    
    @Override
    public void enviarNotificacao(String destinatario, String mensagem) {
        System.out.println("Enviando email para: " + destinatario);
        System.out.println("Mensagem: " + mensagem);
        // Lógica de envio de email
    }
}

// Implementação por SMS
@Service
@Qualifier("sms")
public class SmsNotificationService implements NotificationService {
    
    @Override
    public void enviarNotificacao(String destinatario, String mensagem) {
        System.out.println("Enviando SMS para: " + destinatario);
        System.out.println("Mensagem: " + mensagem);
        // Lógica de envio de SMS
    }
}

// Implementação por Push
@Service
@Qualifier("push")
public class PushNotificationService implements NotificationService {
    
    @Override
    public void enviarNotificacao(String destinatario, String mensagem) {
        System.out.println("Enviando push notification para: " + destinatario);
        System.out.println("Mensagem: " + mensagem);
        // Lógica de push notification
    }
}
```

### 7.2 Usando Qualificadores

```java
@Service
public class NotificationManager {
    
    private final NotificationService emailService;
    private final NotificationService smsService;
    private final NotificationService pushService;
    
    // Injetando implementações específicas
    public NotificationManager(
            @Qualifier("email") NotificationService emailService,
            @Qualifier("sms") NotificationService smsService,
            @Qualifier("push") NotificationService pushService) {
        this.emailService = emailService;
        this.smsService = smsService;
        this.pushService = pushService;
    }
    
    public void enviarNotificacaoCompleta(String destinatario, String mensagem) {
        // Envia por todos os canais
        emailService.enviarNotificacao(destinatario, mensagem);
        smsService.enviarNotificacao(destinatario, mensagem);
        pushService.enviarNotificacao(destinatario, mensagem);
    }
    
    public void enviarPorCanal(String canal, String destinatario, String mensagem) {
        switch (canal.toLowerCase()) {
            case "email":
                emailService.enviarNotificacao(destinatario, mensagem);
                break;
            case "sms":
                smsService.enviarNotificacao(destinatario, mensagem);
                break;
            case "push":
                pushService.enviarNotificacao(destinatario, mensagem);
                break;
            default:
                throw new IllegalArgumentException("Canal não suportado: " + canal);
        }
    }
}
```

---

## 8. Anotações Condicionais

### 8.1 @ConditionalOnProperty

```java
@Service
@ConditionalOnProperty(value = "feature.cache.enabled", havingValue = "true")
public class CacheService {
    
    private final Map<String, Object> cache = new ConcurrentHashMap<>();
    
    public void put(String key, Object value) {
        cache.put(key, value);
    }
    
    public Object get(String key) {
        return cache.get(key);
    }
    
    public void remove(String key) {
        cache.remove(key);
    }
    
    public void clear() {
        cache.clear();
    }
}
```

### 8.2 @ConditionalOnClass

```java
@Configuration
@ConditionalOnClass(RedisTemplate.class)
public class RedisConfig {
    
    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory connectionFactory) {
        RedisTemplate<String, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(connectionFactory);
        template.setDefaultSerializer(new GenericJackson2JsonRedisSerializer());
        return template;
    }
    
    @Bean
    @ConditionalOnMissingBean
    public CacheManager cacheManager(RedisConnectionFactory connectionFactory) {
        RedisCacheManager.Builder builder = RedisCacheManager
            .RedisCacheManagerBuilder
            .fromConnectionFactory(connectionFactory)
            .cacheDefaults(RedisCacheConfiguration.defaultCacheConfig()
                .entryTtl(Duration.ofMinutes(10)));
        
        return builder.build();
    }
}
```

### 8.3 @Profile

```java
// Configuração para ambiente de desenvolvimento
@Configuration
@Profile("dev")
public class DevConfig {
    
    @Bean
    public DataSource dataSource() {
        HikariDataSource dataSource = new HikariDataSource();
        dataSource.setJdbcUrl("jdbc:h2:mem:testdb");
        dataSource.setUsername("sa");
        dataSource.setPassword("");
        return dataSource;
    }
}

// Configuração para ambiente de produção
@Configuration
@Profile("prod")
public class ProdConfig {
    
    @Bean
    public DataSource dataSource() {
        HikariDataSource dataSource = new HikariDataSource();
        dataSource.setJdbcUrl("jdbc:postgresql://localhost:5432/proddb");
        dataSource.setUsername("prod_user");
        dataSource.setPassword("${DB_PASSWORD}");
        dataSource.setMaximumPoolSize(20);
        return dataSource;
    }
}
```

---

## 9. Ciclo de Vida dos Beans

### 9.1 Anotações de Ciclo de Vida

```java
@Component
public class DatabaseConnectionManager {
    
    private Connection connection;
    
    // Executado após a injeção de dependências
    @PostConstruct
    public void inicializar() {
        System.out.println("Inicializando conexão com banco de dados...");
        try {
            connection = DriverManager.getConnection(
                "jdbc:h2:mem:testdb", "sa", ""
            );
            System.out.println("Conexão estabelecida com sucesso!");
        } catch (SQLException e) {
            System.err.println("Erro ao conectar com banco: " + e.getMessage());
        }
    }
    
    // Executado antes da destruição do bean
    @PreDestroy
    public void finalizar() {
        System.out.println("Fechando conexão com banco de dados...");
        try {
            if (connection != null && !connection.isClosed()) {
                connection.close();
                System.out.println("Conexão fechada com sucesso!");
            }
        } catch (SQLException e) {
            System.err.println("Erro ao fechar conexão: " + e.getMessage());
        }
    }
    
    public Connection getConnection() {
        return connection;
    }
}
```

### 9.2 Implementando Interfaces de Ciclo de Vida

```java
@Component
public class ApplicationInitializer implements InitializingBean, DisposableBean {
    
    private final List<String> recursos = new ArrayList<>();
    
    // Implementação de InitializingBean
    @Override
    public void afterPropertiesSet() throws Exception {
        System.out.println("Inicializando recursos da aplicação...");
        recursos.add("Recurso 1");
        recursos.add("Recurso 2");
        recursos.add("Recurso 3");
        System.out.println("Recursos inicializados: " + recursos.size());
    }
    
    // Implementação de DisposableBean
    @Override
    public void destroy() throws Exception {
        System.out.println("Limpando recursos da aplicação...");
        recursos.clear();
        System.out.println("Recursos limpos!");
    }
    
    public List<String> getRecursos() {
        return new ArrayList<>(recursos);
    }
}
```

---

## 10. Exemplo Prático Completo

### 10.1 Entidade

```java
@Entity
@Table(name = "produtos")
public class Produto {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String nome;
    
    @Column(nullable = false)
    private BigDecimal preco;
    
    @Column(name = "categoria")
    private String categoria;
    
    @Column(name = "data_criacao")
    private LocalDateTime dataCriacao;
    
    @PrePersist
    public void prePersist() {
        this.dataCriacao = LocalDateTime.now();
    }
    
    // Construtores
    public Produto() {}
    
    public Produto(String nome, BigDecimal preco, String categoria) {
        this.nome = nome;
        this.preco = preco;
        this.categoria = categoria;
    }
    
    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    
    public BigDecimal getPreco() { return preco; }
    public void setPreco(BigDecimal preco) { this.preco = preco; }
    
    public String getCategoria() { return categoria; }
    public void setCategoria(String categoria) { this.categoria = categoria; }
    
    public LocalDateTime getDataCriacao() { return dataCriacao; }
    public void setDataCriacao(LocalDateTime dataCriacao) { this.dataCriacao = dataCriacao; }
}
```

### 10.2 Repository

```java
@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long> {
    
    List<Produto> findByCategoria(String categoria);
    
    List<Produto> findByNomeContainingIgnoreCase(String nome);
    
    @Query("SELECT p FROM Produto p WHERE p.preco BETWEEN :precoMin AND :precoMax")
    List<Produto> findByPrecoRange(@Param("precoMin") BigDecimal precoMin, 
                                  @Param("precoMax") BigDecimal precoMax);
    
    @Modifying
    @Query("UPDATE Produto p SET p.preco = p.preco * :fator WHERE p.categoria = :categoria")
    int atualizarPrecosPorCategoria(@Param("categoria") String categoria, 
                                   @Param("fator") BigDecimal fator);
}
```

### 10.3 Service

```java
@Service
@Transactional
public class ProdutoService {
    
    private final ProdutoRepository produtoRepository;
    private final NotificationService notificationService;
    private final CacheService cacheService;
    
    public ProdutoService(ProdutoRepository produtoRepository,
                         @Qualifier("email") NotificationService notificationService,
                         @Autowired(required = false) CacheService cacheService) {
        this.produtoRepository = produtoRepository;
        this.notificationService = notificationService;
        this.cacheService = cacheService;
    }
    
    public List<Produto> listarTodos() {
        String cacheKey = "produtos_todos";
        
        if (cacheService != null) {
            @SuppressWarnings("unchecked")
            List<Produto> cached = (List<Produto>) cacheService.get(cacheKey);
            if (cached != null) {
                return cached;
            }
        }
        
        List<Produto> produtos = produtoRepository.findAll();
        
        if (cacheService != null) {
            cacheService.put(cacheKey, produtos);
        }
        
        return produtos;
    }
    
    public Produto salvarProduto(Produto produto) {
        validarProduto(produto);
        
        Produto produtoSalvo = produtoRepository.save(produto);
        
        // Limpar cache
        if (cacheService != null) {
            cacheService.remove("produtos_todos");
        }
        
        // Enviar notificação
        notificationService.enviarNotificacao(
            "admin@exemplo.com",
            "Novo produto criado: " + produto.getNome()
        );
        
        return produtoSalvo;
    }
    
    public Optional<Produto> buscarPorId(Long id) {
        return produtoRepository.findById(id);
    }
    
    public List<Produto> buscarPorCategoria(String categoria) {
        return produtoRepository.findByCategoria(categoria);
    }
    
    public void deletar