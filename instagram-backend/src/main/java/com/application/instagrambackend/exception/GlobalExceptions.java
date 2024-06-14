package com.application.instagrambackend.exception;

import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;

@ControllerAdvice
public class GlobalExceptions {

    @ExceptionHandler(UserException.class)
    public ResponseEntity<ErrorDetails> UserExceptionHandler(UserException ue, WebRequest req){
        ErrorDetails err = new ErrorDetails(ue.getMessage(), req.getDescription(false), LocalDateTime.now()) ;

        return new ResponseEntity<ErrorDetails>(err, HttpStatus.BAD_REQUEST) ;
    }

    @ExceptionHandler(PostException.class)
    public ResponseEntity<ErrorDetails> PostExceptionHandler(PostException ue, WebRequest req){
        ErrorDetails err = new ErrorDetails(ue.getMessage(), req.getDescription(false), LocalDateTime.now()) ;

        return new ResponseEntity<ErrorDetails>(err, HttpStatus.BAD_REQUEST) ;
    }

    @ExceptionHandler(CommentException.class)
    public ResponseEntity<ErrorDetails> PostExceptionHandler(CommentException ue, WebRequest req){
        ErrorDetails err = new ErrorDetails(ue.getMessage(), req.getDescription(false), LocalDateTime.now()) ;

        return new ResponseEntity<ErrorDetails>(err, HttpStatus.BAD_REQUEST) ;
    }

    @ExceptionHandler(StoryException.class)
    public ResponseEntity<ErrorDetails> PostExceptionHandler(StoryException ue, WebRequest req){
        ErrorDetails err = new ErrorDetails(ue.getMessage(), req.getDescription(false), LocalDateTime.now()) ;

        return new ResponseEntity<ErrorDetails>(err, HttpStatus.BAD_REQUEST) ;
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorDetails> MethodArgumentNotValidExceptionHandler(MethodArgumentNotValidException me, WebRequest req){
        ErrorDetails err = new ErrorDetails(me.getBindingResult().getFieldError().getDefaultMessage(),"validation error",LocalDateTime.now()) ;

        return new ResponseEntity<ErrorDetails>(err, HttpStatus.BAD_REQUEST) ;
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorDetails> OtherExceptionHandler(Exception ue, WebRequest req){
        ErrorDetails err = new ErrorDetails(ue.getMessage(), req.getDescription(false), LocalDateTime.now()) ;

        return new ResponseEntity<ErrorDetails>(err, HttpStatus.BAD_REQUEST) ;
    }
}
