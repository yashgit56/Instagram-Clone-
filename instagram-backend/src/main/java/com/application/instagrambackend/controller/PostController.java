package com.application.instagrambackend.controller;

import com.application.instagrambackend.exception.PostException;
import com.application.instagrambackend.exception.UserException;
import com.application.instagrambackend.modal.Post;
import com.application.instagrambackend.modal.User;
import com.application.instagrambackend.response.MessageResponse;
import com.application.instagrambackend.service.PostService;
import com.application.instagrambackend.service.UserService;
import com.application.instagrambackend.service.UserServiceImplement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "http://localhost:3000")
public class PostController {

    @Autowired
    private PostService postService;

    @Autowired
    private UserService userService;

    @PostMapping("/create")
    public ResponseEntity<Post> createdPostHandler(@RequestBody Post post, @RequestHeader("Authorization") String token) throws UserException {
        User user = userService.findUserProfile(token);
        Post createdPost = postService.createPost(post, user.getId());

        return new ResponseEntity<Post>(createdPost, HttpStatus.OK);
    }

    @GetMapping("/all/{userId}")
    public ResponseEntity<List<Post>> findPostByUserIdHandler(@PathVariable Integer userId) throws PostException {
        List<Post> posts = postService.findPostByUserId(userId);

        return new ResponseEntity<List<Post>>(posts, HttpStatus.OK);
    }

    @GetMapping("/following/{ids}")
    public ResponseEntity<List<Post>> findAllPostByUserIdsHandler(@PathVariable("ids") List<Integer> userIds) throws UserException, PostException {
        List<Post> posts = postService.findAllPostByUserIds(userIds);

        return new ResponseEntity<List<Post>>(posts, HttpStatus.OK);
    }

    @GetMapping("/{postId}")
    public ResponseEntity<Post> findPostByIdHandler(@PathVariable Integer postId) throws PostException {
        Post post = postService.findPostById(postId) ;

        return new ResponseEntity<Post>(post,HttpStatus.OK) ;
    }

    @PutMapping("/like/{postId}")
    public ResponseEntity<Post> likePostHandler(@PathVariable Integer postId, @RequestHeader("Authorization") String token) throws UserException, PostException{
        User user = userService.findUserProfile(token) ;
        Post likedPost = postService.likePost(postId, user.getId()) ;

        return new ResponseEntity<Post>(likedPost, HttpStatus.OK) ;
    }

    @PutMapping("/unlike/{postId}")
    public ResponseEntity<Post> unlikePostHandler(@PathVariable Integer postId, @RequestHeader("Authorization") String token) throws UserException, PostException{
        User user = userService.findUserProfile(token) ;
        Post unlikedPost = postService.unlikePost(postId, user.getId()) ;

        return new ResponseEntity<Post>(unlikedPost, HttpStatus.OK) ;
    }

    @DeleteMapping("/delete/{postId}")
    public ResponseEntity<MessageResponse> deletePostHandler(@PathVariable Integer postId, @RequestHeader("Authorization") String token ) throws UserException, PostException{
        User user = userService.findUserProfile(token) ;

        String message = postService.deletePost(postId,user.getId());

        MessageResponse res = new MessageResponse(message) ;

        return new ResponseEntity<MessageResponse>(res,HttpStatus.ACCEPTED) ;
    }

    @PutMapping("/save_post/{postId}")
    public ResponseEntity<MessageResponse> savedPostHandler(@PathVariable Integer postId ,@RequestHeader("Authorization") String token) throws UserException, PostException {
        User user = userService.findUserProfile(token) ;

        String message = postService.savedPost(postId, user.getId());

        MessageResponse res = new MessageResponse(message) ;

        return new ResponseEntity<MessageResponse>(res, HttpStatus.ACCEPTED) ;
    }

    @PutMapping("/unsave_post/{postId}")
    public ResponseEntity<MessageResponse> unsavedPostHandler(@PathVariable Integer postId ,@RequestHeader("Authorization") String token) throws UserException, PostException {
        User user = userService.findUserProfile(token) ;

        String message = postService.unSavedPost(postId, user.getId());

        MessageResponse res = new MessageResponse(message) ;

        return new ResponseEntity<MessageResponse>(res, HttpStatus.ACCEPTED) ;
    }



}
