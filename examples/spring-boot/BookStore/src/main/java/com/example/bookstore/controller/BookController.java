package com.example.bookstore.controller;

import com.example.bookstore.model.Book;
import com.example.bookstore.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
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
    public List<Book> findAll() {
        return this.bookService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Book> findBookById(@PathVariable Long id) {
        return this.bookService.findById(id);
    }

    @GetMapping
    public Book findBookByTitle(@RequestParam("t") String title) {
        return this.bookService.findByTitle(title);
    }

    @PostMapping
    public Book createBook(@RequestBody Book book) {
        System.out.println(book.getTitle());
        return this.bookService.createBook(book);
    }
}
