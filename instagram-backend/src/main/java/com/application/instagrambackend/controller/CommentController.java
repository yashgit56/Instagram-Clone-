package com.application.instagrambackend.controller;

import com.application.instagrambackend.exception.CommentException;
import com.application.instagrambackend.exception.PostException;
import com.application.instagrambackend.exception.UserException;
import com.application.instagrambackend.modal.Comment;
import com.application.instagrambackend.modal.User;
import com.application.instagrambackend.service.CommentService;
import com.application.instagrambackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/api/comments")
@CrossOrigin(origins = "http://localhost:3000")
public class CommentController {

    @Autowired
    private CommentService commentService ;

    @Autowired
    private UserService userService ;

    @PostMapping("/create/{postId}")
    public ResponseEntity<Comment> createCommentHandler(@RequestBody  Comment comment, @PathVariable Integer postId, @RequestHeader("Authorization") String token) throws  UserException, PostException {

        User user = userService.findUserProfile(token) ;

        Comment createdComment = commentService.createComment(comment, postId, user.getId()) ;

        return new ResponseEntity<Comment>(createdComment, HttpStatus.OK) ;
    }

    @GetMapping("/{commentId}")
    public ResponseEntity<Comment> findCommentByIdHandler(@PathVariable Integer commentId, @RequestHeader("Authorization") String token) throws CommentException {

        Comment comment = commentService.findCommentById(commentId) ;

        return new ResponseEntity<Comment>(comment,HttpStatus.OK) ;
    }

    @GetMapping("/all/{postId}")
    public ResponseEntity<List<Comment>> findPostCommentHandler(@PathVariable Integer postId, @RequestHeader("Authorization") String token) throws CommentException {

        List<Comment> comments = commentService.findCommentsByPostId(postId) ;

        return new ResponseEntity<List<Comment>>(comments,HttpStatus.OK) ;
    }

    @PutMapping("/like/{commentId}")
    public ResponseEntity<Comment> likeCommentHandler(@RequestHeader("Authorization") String token, @PathVariable Integer commentId) throws UserException, CommentException {

        User user = userService.findUserProfile(token) ;

        Comment likedComment = commentService.likeComment(commentId, user.getId());

        return new ResponseEntity<Comment>(likedComment, HttpStatus.OK) ;
    }

    @PutMapping("/unlike/{commentId}")
    public ResponseEntity<Comment> unlikeCommentHandler(@RequestHeader("Authorization") String token, @PathVariable Integer commentId) throws UserException, CommentException {

        User user = userService.findUserProfile(token) ;

        Comment unlikedComment = commentService.unlikeComment(commentId, user.getId());

        return new ResponseEntity<Comment>(unlikedComment, HttpStatus.OK) ;
    }

}
