package com.app.service;

import com.app.dto.BookReqDto;
import com.app.model.Author;
import com.app.model.Book;
import com.app.repository.BookRepository;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class BookService {

    private final AuthorService authorService;
    private final BookRepository bookRepository;

    public void addBook(int authorId, @Valid BookReqDto dto) {

        Author author=authorService.findById(authorId);
        Book book=new Book();
        book.setTitle(dto.title());
        book.setSummary(dto.summary());
        book.setAuthor(author);

        bookRepository.save(book);
    }
}
