package com.example.bookstore.service;

import com.example.bookstore.model.Book;
import com.example.bookstore.repository.BookRepository;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {

    private final BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public List<Book> findAll() {
        return this.bookRepository.findAll();
    }

    public ResponseEntity<Book> findById(Long id) {
        Book book = this.bookRepository.findById(id).orElse(null);

        if(book == null){
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(book);
    }

    public Book findByTitle(String title) {
        return this.bookRepository.findByTitleIgnoreCase(title);
    }

    public Book createBook(Book book) {
        return this.bookRepository.save(book);
    }

}
