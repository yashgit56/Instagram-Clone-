package com.application.instagrambackend.exception;

import java.time.LocalDateTime;

public class ErrorDetails {

    private String message ;

    private String description ;

    private LocalDateTime timestamp;

    public ErrorDetails() {

    }

    public ErrorDetails(String message, String description, LocalDateTime timestamp) {
        super();
        this.message = message;
        this.description = description;
        this.timestamp = timestamp;
    }
}
