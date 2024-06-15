package com.application.instagrambackend.controller;

import com.application.instagrambackend.config.SecurityContext;
import com.application.instagrambackend.exception.UserException;
import com.application.instagrambackend.modal.User;
import com.application.instagrambackend.repository.UserRepository;
import com.application.instagrambackend.response.MessageResponse;
import com.application.instagrambackend.service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.Option;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserService userService ;

    @Autowired
    private UserRepository userRepo ;

    @PostMapping("/signup")
    public ResponseEntity<User> registerUserHandler(@RequestBody User user) throws UserException {
        User createdUser = userService.registerUser(user);

        return new ResponseEntity<User>(createdUser, HttpStatus.OK) ;
    }

    @GetMapping("/signin")
    public ResponseEntity<MessageResponse> loginUserHandler(Authentication auth, HttpServletResponse response) throws BadCredentialsException {

        String jwtToken = response.getHeader(SecurityContext.HEADER) ;

        if(!jwtToken.isEmpty()){
            MessageResponse message = new MessageResponse(jwtToken) ;

            return new ResponseEntity<>(message,HttpStatus.ACCEPTED);
        }

        throw new BadCredentialsException("Invalid username or password") ;
    }
}
