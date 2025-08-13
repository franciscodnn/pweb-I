[main](../../README.md)

# Aula 16 - Criando uma API REST com Spring Boot - BookStore

## Objetivos da Aula
- Compreender os conceitos básicos de uma API REST
- Configurar um projeto Spring Boot com banco H2
- Criar uma entidade JPA
- Implementar um controller REST com operações CRUD
- Testar a API utilizando ferramentas adequadas

## 1. Configuração do Projeto

### Dependências necessárias (pom.xml)
```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    <dependency>
        <groupId>com.h2database</groupId>
        <artifactId>h2</artifactId>
        <scope>runtime</scope>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-validation</artifactId>
    </dependency>
</dependencies>
```

### Configuração do application.properties
```properties
# Configuração do Banco H2
spring.datasource.url=jdbc:h2:mem:bookstore
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

# Configuração JPA/Hibernate
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.hibernate.ddl-auto=create-drop
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

# Console H2 (para desenvolvimento)
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console
```

## 2. Criando a Entidade Book

```java
package com.bookstore.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Entity
@Table(name = "books")
public class Book {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Título é obrigatório")
    @Column(nullable = false)
    private String titulo;
    
    @NotNull(message = "Preço é obrigatório")
    @Positive(message = "Preço deve ser positivo")
    @Column(nullable = false)
    private Double preco;
    
    @NotNull(message = "Número de páginas é obrigatório")
    @Positive(message = "Número de páginas deve ser positivo")
    @Column(nullable = false)
    private Integer paginas;
    
    // Construtores
    public Book() {}
    
    public Book(String titulo, Double preco, Integer paginas) {
        this.titulo = titulo;
        this.preco = preco;
        this.paginas = paginas;
    }
    
    // Getters e Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getTitulo() {
        return titulo;
    }
    
    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }
    
    public Double getPreco() {
        return preco;
    }
    
    public void setPreco(Double preco) {
        this.preco = preco;
    }
    
    public Integer getPaginas() {
        return paginas;
    }
    
    public void setPaginas(Integer paginas) {
        this.paginas = paginas;
    }
}
```

## 3. Criando o Repository

```java
package com.bookstore.repository;

import com.bookstore.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    
    // Método customizado para buscar por título
    List<Book> findByTituloContainingIgnoreCase(String titulo);
    
    // Método customizado para buscar por faixa de preço
    List<Book> findByPrecoBetween(Double precoMin, Double precoMax);
}
```

## 4. Criando a Camada de Serviço

### Interface BookService

```java
package com.bookstore.service;

import com.bookstore.entity.Book;

import java.util.List;
import java.util.Optional;

public interface BookService {
    
    List<Book> findAll();
    Optional<Book> findById(Long id);
    Book save(Book book);
    Book update(Long id, Book book);
    void deleteById(Long id);
    boolean existsById(Long id);
    List<Book> findByTituloContaining(String titulo);
    List<Book> findByPriceRange(Double min, Double max);
}
```

### Implementação BookServiceImpl

```java
package com.bookstore.service.impl;

import com.bookstore.entity.Book;
import com.bookstore.exception.BookNotFoundException;
import com.bookstore.repository.BookRepository;
import com.bookstore.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookServiceImpl implements BookService {
    
    // @Autowired /* evitar */
    private BookRepository bookRepository;

    public BookServiceImpl(BookRepository bookRepository) {
      this.bookRepository = bookRepository;
    }
    
    @Override
    public List<Book> findAll() {
        return bookRepository.findAll();
    }
    
    @Override
    public Optional<Book> findById(Long id) {
        return bookRepository.findById(id);
    }
    
    @Override
    public Book save(Book book) {
        validateBook(book);
        return bookRepository.save(book);
    }
    
    @Override
    public Book update(Long id, Book book) {
        if (!bookRepository.existsById(id)) {
            throw new BookNotFoundException("Livro com ID " + id + " não encontrado");
        }
        
        validateBook(book);
        book.setId(id);
        return bookRepository.save(book);
    }
    
    @Override
    public void deleteById(Long id) {
        if (!bookRepository.existsById(id)) {
            throw new BookNotFoundException("Livro com ID " + id + " não encontrado");
        }
        bookRepository.deleteById(id);
    }
    
    @Override
    public boolean existsById(Long id) {
        return bookRepository.existsById(id);
    }
    
    @Override
    public List<Book> findByTituloContaining(String titulo) {
        if (titulo == null || titulo.trim().isEmpty()) {
            throw new IllegalArgumentException("Título de busca não pode ser vazio");
        }
        return bookRepository.findByTituloContainingIgnoreCase(titulo.trim());
    }
    
    @Override
    public List<Book> findByPriceRange(Double min, Double max) {
        if (min == null || max == null) {
            throw new IllegalArgumentException("Preços mínimo e máximo devem ser informados");
        }
        if (min < 0 || max < 0) {
            throw new IllegalArgumentException("Preços não podem ser negativos");
        }
        if (min > max) {
            throw new IllegalArgumentException("Preço mínimo não pode ser maior que o máximo");
        }
        return bookRepository.findByPrecoBetween(min, max);
    }
    
    // Método privado para validações de negócio
    private void validateBook(Book book) {
        if (book.getTitulo() != null && book.getTitulo().length() > 200) {
            throw new IllegalArgumentException("Título não pode ter mais de 200 caracteres");
        }
        
        if (book.getPreco() != null && book.getPreco() > 1000) {
            throw new IllegalArgumentException("Preço não pode ser superior a R$ 1000,00");
        }
        
        if (book.getPaginas() != null && book.getPaginas() > 10000) {
            throw new IllegalArgumentException("Número de páginas não pode ser superior a 10.000");
        }
    }
}
```

## 5. Criando Exceções Customizadas

```java
package com.bookstore.exception;

public class BookNotFoundException extends RuntimeException {
    
    public BookNotFoundException(String message) {
        super(message);
    }
    
    public BookNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
```

## 6. Criando o Controller REST

```java
package com.bookstore.controller;

import com.bookstore.entity.Book;
import com.bookstore.service.BookService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "*")
public class BookController {
    
    @Autowired
    private BookService bookService;
    
    // GET - Listar todos os livros
    @GetMapping
    public ResponseEntity<List<Book>> getAllBooks() {
        List<Book> books = bookService.findAll();
        return ResponseEntity.ok(books);
    }
    
    // GET - Buscar livro por ID
    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable Long id) {
        Optional<Book> book = bookService.findById(id);
        
        if (book.isPresent()) {
            return ResponseEntity.ok(book.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    // POST - Criar novo livro
    @PostMapping
    public ResponseEntity<Book> createBook(@Valid @RequestBody Book book) {
        Book savedBook = bookService.save(book);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedBook);
    }
    
    // PUT - Atualizar livro existente
    @PutMapping("/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable Long id, @Valid @RequestBody Book bookDetails) {
        try {
            Book updatedBook = bookService.update(id, bookDetails);
            return ResponseEntity.ok(updatedBook);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    // DELETE - Deletar livro
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
        try {
            bookService.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    // GET - Buscar livros por título
    @GetMapping("/search")
    public ResponseEntity<List<Book>> searchBooksByTitle(@RequestParam String titulo) {
        try {
            List<Book> books = bookService.findByTituloContaining(titulo);
            return ResponseEntity.ok(books);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    // GET - Buscar livros por faixa de preço
    @GetMapping("/price-range")
    public ResponseEntity<List<Book>> getBooksByPriceRange(
            @RequestParam Double min, 
            @RequestParam Double max) {
        try {
            List<Book> books = bookService.findByPriceRange(min, max);
            return ResponseEntity.ok(books);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
```

## 7. Tratamento de Exceções Atualizado

```java
package com.bookstore.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidationExceptions(
            MethodArgumentNotValidException ex) {
        
        Map<String, String> fieldErrors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error -> 
            fieldErrors.put(error.getField(), error.getDefaultMessage())
        );
        
        Map<String, Object> response = new HashMap<>();
        response.put("timestamp", LocalDateTime.now());
        response.put("status", HttpStatus.BAD_REQUEST.value());
        response.put("error", "Dados de entrada inválidos");
        response.put("fieldErrors", fieldErrors);
        
        return ResponseEntity.badRequest().body(response);
    }
    
    @ExceptionHandler(BookNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleBookNotFoundException(BookNotFoundException ex) {
        Map<String, Object> response = new HashMap<>();
        response.put("timestamp", LocalDateTime.now());
        response.put("status", HttpStatus.NOT_FOUND.value());
        response.put("error", "Recurso não encontrado");
        response.put("message", ex.getMessage());
        
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }
    
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, Object>> handleIllegalArgumentException(IllegalArgumentException ex) {
        Map<String, Object> response = new HashMap<>();
        response.put("timestamp", LocalDateTime.now());
        response.put("status", HttpStatus.BAD_REQUEST.value());
        response.put("error", "Argumentos inválidos");
        response.put("message", ex.getMessage());
        
        return ResponseEntity.badRequest().body(response);
    }
    
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleGenericException(Exception ex) {
        Map<String, Object> response = new HashMap<>();
        response.put("timestamp", LocalDateTime.now());
        response.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());
        response.put("error", "Erro interno do servidor");
        response.put("message", "Ocorreu um erro inesperado");
        
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
}
```

## 8. Classe Principal da Aplicação

```java
package com.bookstore;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BookStoreApplication {
    
    public static void main(String[] args) {
        SpringApplication.run(BookStoreApplication.class, args);
    }
}
```

## 9. Testando a API

### Endpoints disponíveis:

| Método | URL | Descrição |
|--------|-----|-----------|
| GET | `/api/books` | Lista todos os livros |
| GET | `/api/books/{id}` | Busca livro por ID |
| POST | `/api/books` | Cria novo livro |
| PUT | `/api/books/{id}` | Atualiza livro existente |
| DELETE | `/api/books/{id}` | Remove livro |
| GET | `/api/books/search?titulo=nome` | Busca por título |
| GET | `/api/books/price-range?min=10&max=50` | Busca por faixa de preço |

### Exemplos de requisições:

#### Criar um novo livro (POST /api/books):
```json
{
    "titulo": "Clean Code",
    "preco": 45.90,
    "paginas": 464
}
```

#### Atualizar um livro (PUT /api/books/1):
```json
{
    "titulo": "Clean Code - Edição Atualizada",
    "preco": 55.90,
    "paginas": 500
}
```

## 10. Acessando o Console H2

1. Inicie a aplicação
2. Acesse: `http://localhost:8080/h2-console`
3. Use as configurações:
   - JDBC URL: `jdbc:h2:mem:bookstore`
   - Username: `sa`
   - Password: (deixe em branco)

## Conceitos Importantes

### REST (Representational State Transfer)
- **Stateless**: Cada requisição contém toda informação necessária
- **Recursos**: Identificados por URLs (ex: `/api/books/1`)
- **Métodos HTTP**: GET, POST, PUT, DELETE
- **Códigos de Status**: 200 (OK), 201 (Created), 404 (Not Found), etc.

### Anotações Spring Boot Utilizadas:
- `@RestController`: Marca a classe como controller REST
- `@Service`: Marca a classe como componente de serviço
- `@Repository`: Marca a interface como repositório de dados
- `@RequestMapping`: Define o mapeamento base das URLs
- `@GetMapping`, `@PostMapping`, etc.: Mapeiam métodos HTTP específicos
- `@PathVariable`: Extrai variáveis da URL
- `@RequestParam`: Extrai parâmetros de query string
- `@RequestBody`: Mapeia o corpo da requisição para objeto Java
- `@Valid`: Ativa validação dos dados
- `@Autowired`: Injeta dependências automaticamente

### Camada de Serviço (Service Layer):
A camada de serviço é responsável por:
- **Lógica de negócio**: Implementa as regras específicas da aplicação
- **Validações customizadas**: Além das validações básicas da entidade
- **Transações**: Gerencia operações que envolvem múltiplas entidades
- **Abstração**: Isola o controller da camada de dados
- **Reutilização**: Permite reutilizar lógicas em diferentes controllers

### Banco H2:
- Banco em memória ideal para desenvolvimento e testes
- Dados perdidos ao reiniciar a aplicação
- Console web integrado para visualização dos dados

## Próximos Passos

1. Implementar paginação nas listagens
2. Adicionar autenticação e autorização
3. Criar testes unitários e de integração para services e controllers
4. Implementar cache na camada de serviço
5. Adicionar documentação com Swagger/OpenAPI
6. Criar DTOs (Data Transfer Objects) para separar entidades de dados de entrada/saída