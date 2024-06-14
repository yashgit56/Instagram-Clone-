package com.application.instagrambackend.exception;

import com.application.instagrambackend.service.CommentService;

public class CommentException extends Exception {
    public CommentException(String message) {
        super(message);
    }
}
