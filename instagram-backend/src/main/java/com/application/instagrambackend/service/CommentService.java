package com.application.instagrambackend.service;

import com.application.instagrambackend.exception.CommentException;
import com.application.instagrambackend.exception.PostException;
import com.application.instagrambackend.exception.UserException;
import com.application.instagrambackend.modal.Comment;
import jdk.jshell.spi.ExecutionControl;

import java.util.List;

public interface CommentService {
    Comment createComment(Comment comment, Integer postId, Integer userId) throws UserException, PostException;

    Comment findCommentById(Integer commentId) throws CommentException;

    List<Comment> findCommentsByPostId(Integer postId) throws CommentException ;

    Comment likeComment(Integer commentId, Integer userId) throws CommentException, UserException ;

    Comment unlikeComment(Integer commentId, Integer userId) throws CommentException, UserException ;
}
