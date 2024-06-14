package com.application.instagrambackend.service;

import com.application.instagrambackend.exception.PostException;
import com.application.instagrambackend.exception.UserException;
import com.application.instagrambackend.modal.Post;

import java.util.List;

public interface PostService {

    Post createPost(Post post, Integer userId) throws UserException ;

    Post findPostById(Integer postId) throws PostException ;

    List<Post> findPostByUserId(Integer userId) throws PostException ;

    List<Post> findAllPostByUserIds(List<Integer> userIds) throws UserException, PostException ;

    String deletePost(Integer postId, Integer userId) throws UserException, PostException ;

    String savedPost(Integer postId, Integer userId) throws UserException, PostException ;

    String unSavedPost(Integer postId, Integer userId) throws UserException, PostException ;

    Post likePost(Integer postId, Integer userId) throws UserException, PostException ;

    Post unlikePost(Integer postId, Integer userId) throws UserException, PostException ;
}
