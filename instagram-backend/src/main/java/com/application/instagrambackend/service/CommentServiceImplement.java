package com.application.instagrambackend.service;

import com.application.instagrambackend.dto.UserDto;
import com.application.instagrambackend.exception.CommentException;
import com.application.instagrambackend.exception.PostException;
import com.application.instagrambackend.exception.UserException;
import com.application.instagrambackend.modal.Comment;
import com.application.instagrambackend.modal.Post;
import com.application.instagrambackend.modal.User;
import com.application.instagrambackend.repository.CommentRepository;
import com.application.instagrambackend.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class CommentServiceImplement implements CommentService {

    @Autowired
    private CommentRepository commentRepo;

    @Autowired
    private UserService userService ;

    @Autowired
    private PostService postService ;

    @Autowired
    private PostRepository postRepo ;


    @Override
    public Comment createComment(Comment comment, Integer postId, Integer userId) throws UserException, PostException {
        User user = userService.findUserById(userId) ;

        Post post = postService.findPostById(postId) ;

        UserDto userDto = new UserDto();
        userDto.setEmail(user.getEmail()) ;
        userDto.setId(user.getId()) ;
        userDto.setName(user.getName()) ;
        userDto.setUserImage(user.getImage()) ;
        userDto.setUsername(user.getUsername()) ;

        comment.setUser(userDto) ;
        comment.setCreatedAt(LocalDateTime.now()) ;

        Comment createdComment = commentRepo.save(comment) ;

        post.getComments().add(createdComment) ;

        postRepo.save(post) ;

        return createdComment ;
    }

    @Override
    public Comment findCommentById(Integer commentId) throws CommentException {

        Optional<Comment> opt = commentRepo.findById(commentId) ;

        return opt.orElse(null);

    }

    @Override
    public List<Comment> findCommentsByPostId(Integer postId) throws CommentException {
        Optional<Post> post = postRepo.findById(postId) ;

        return post.map(Post::getComments).orElse(null);
    }

    @Override
    public Comment likeComment(Integer commentId, Integer userId) throws CommentException, UserException {
        User user = userService.findUserById(userId) ;

        Comment comment =  findCommentById(commentId) ;

        UserDto userDto = new UserDto() ;
        userDto.setEmail(user.getEmail()) ;
        userDto.setId(user.getId()) ;
        userDto.setName(user.getName()) ;
        userDto.setUserImage(user.getImage()) ;
        userDto.setUsername(user.getUsername()) ;

        comment.getLikedByUsers().add(userDto) ;

        return commentRepo.save(comment) ;
    }

    @Override
    public Comment unlikeComment(Integer commentId, Integer userId) throws CommentException, UserException {
        User user = userService.findUserById(userId) ;

        Comment comment =  findCommentById(commentId) ;

        UserDto userDto = new UserDto() ;
        userDto.setEmail(user.getEmail()) ;
        userDto.setId(user.getId()) ;
        userDto.setName(user.getName()) ;
        userDto.setUserImage(user.getImage()) ;
        userDto.setUsername(user.getUsername()) ;

        comment.getLikedByUsers().remove(userDto) ;

        return commentRepo.save(comment) ;
    }
}
