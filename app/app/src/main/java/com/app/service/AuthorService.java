package com.app.service;


import com.app.exception.ResourceNotFoundException;
import com.app.model.Author;
import com.app.repository.AuthorRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AuthorService {


    private final AuthorRepository authorRepository;
    public Author findById(int authorId) {
        return authorRepository.findById(authorId).orElseThrow(
                ()->new ResourceNotFoundException("Author not found!")
        );
    }
}
