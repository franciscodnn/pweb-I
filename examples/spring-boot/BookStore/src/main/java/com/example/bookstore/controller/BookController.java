package com.example.bookstore.controller;

import com.example.bookstore.model.Book;
import com.example.bookstore.service.BookService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/books")
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Book>> findAll() {
        return ResponseEntity.status(HttpStatus.OK).body(this.bookService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findBookById(@PathVariable("id") Long id) {
        Book book = bookService.findById(id);

        if(book == null) {
            // return ResponseEntity.notFound().build();
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Livro não encontrado");
        }

        return ResponseEntity.ok(book);
    }

    @GetMapping
    public ResponseEntity<Book> findBookByTitle(@RequestParam("t") String title) {
        Book book = bookService.findByTitle(title);

        return ResponseEntity.status(HttpStatus.OK).body(book);
        // return new ResponseEntity<Book>(book, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Book> createBook(@RequestBody Book book) {
        System.out.println(book);

        return ResponseEntity.ok(bookService.createBook(book));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> remove(@PathVariable Long id) {
        return ResponseEntity.ok(bookService.removeBook(id));
    }

}
