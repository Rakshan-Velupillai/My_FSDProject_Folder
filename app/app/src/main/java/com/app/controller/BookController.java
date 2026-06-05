package com.app.controller;


import com.app.dto.BookReqDto;
import com.app.service.BookService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/book")
public class BookController {

    private final BookService bookService;

    @PostMapping("/addBook/{authorId}")
    public void addBook(@PathVariable int authorId,@Valid @RequestBody BookReqDto dto){
        bookService.addBook(authorId,dto);
    }


}


/*

*Create a POST API to add Book record in the DB.
Read authorId as path variable.
Create a DTO to read title and summary from the API caller.
validate it using validation annotations.
Handle the Exception
 */