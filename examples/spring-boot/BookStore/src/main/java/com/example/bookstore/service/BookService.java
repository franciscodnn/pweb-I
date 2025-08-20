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

    public Book findById(Long id) {
        return this.bookRepository.findById(id).orElse(null);
    }

    public Book findByTitle(String title) {
        return this.bookRepository.findByTitleIgnoreCase(title);
    }

    public Book createBook(Book book) {
        return bookRepository.save(book);
    }

    public String removeBook(Long id) {
        Book book = this.findById(id);

        if(book == null) {
            return "Livro não encontrado";
        }

        bookRepository.delete(book);

        return "Livro removido com sucesso";
    }

}
