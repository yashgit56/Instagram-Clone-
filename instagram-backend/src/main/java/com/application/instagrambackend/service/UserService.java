package com.application.instagrambackend.service;

import com.application.instagrambackend.dto.UserDto;
import com.application.instagrambackend.exception.UserException;
import com.application.instagrambackend.modal.User;

import java.util.List;

public interface UserService {

    User registerUser(User user) throws UserException ;

    User findUserById(Integer userId) throws UserException ;

    User findUserProfile(String token) throws UserException ;

    User findUserByUsername(String username) throws UserException ;

    String followUser(Integer reqUserId, Integer followUserId) throws UserException ;

    String unfollowUser(Integer reqUserId, Integer followUserId) throws UserException ;

    List<User> findUserByIds(List<Integer> userIds) throws UserException ;

    List<User> searchUser(String query) throws UserException ;

    User updateUserDetails(User updatedUser, User existingUser) throws UserException ;

    List<UserDto> getUsersSuggestionToFollow(User user) throws UserException ;
}
