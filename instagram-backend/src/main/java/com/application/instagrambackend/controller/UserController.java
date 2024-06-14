package com.application.instagrambackend.controller;

import com.application.instagrambackend.dto.UserDto;
import com.application.instagrambackend.exception.UserException;
import com.application.instagrambackend.modal.User;
import com.application.instagrambackend.response.MessageResponse;
import com.application.instagrambackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService ;

    @GetMapping("/id/{id}")
    public ResponseEntity<User> findUserByIdHandler(@PathVariable Integer id) throws UserException {
        User user = userService.findUserById(id) ;

        return new ResponseEntity<User>(user, HttpStatus.OK) ;
    }

    @GetMapping("/username/{username}")
    public ResponseEntity<User> findUserByUsernameHandler(@PathVariable String username) throws UserException {
        User user = userService.findUserByUsername(username);

        return new ResponseEntity<User>(user, HttpStatus.OK);
    }

    @PutMapping("/follow/{followUserId}")
    public ResponseEntity<MessageResponse> followUserHandler(@PathVariable Integer followUserId, @RequestHeader("Authorization") String token) throws UserException{
        User user = userService.findUserProfile(token);

        String message = userService.followUser(user.getId(), followUserId) ;

        MessageResponse response = new MessageResponse(message) ;

        return new ResponseEntity<MessageResponse>(response, HttpStatus.OK) ;
    }

    @PutMapping("/unfollow/{userId}")
    public ResponseEntity<MessageResponse> unfollowUserHandler(@PathVariable Integer userId, @RequestHeader("Authorization") String token) throws UserException{
        User user = userService.findUserProfile(token);

        String message = userService.unfollowUser(user.getId(), userId) ;

        MessageResponse response = new MessageResponse(message) ;

        return new ResponseEntity<MessageResponse>(response, HttpStatus.OK) ;
    }

    @GetMapping("/req")
    public ResponseEntity<User> findUserProfileHandler(@RequestHeader("Authorization") String token) throws UserException{
        User user = userService.findUserProfile(token) ;

        System.out.println("reqUser: "+user.toString());

        return new ResponseEntity<User>(user,HttpStatus.OK) ;
    }

    @GetMapping("/m/{userIds}")
    public ResponseEntity<List<User>> findUserByIdsHandler(@PathVariable List<Integer> userIds) throws UserException{
        List<User> users = userService.findUserByIds(userIds) ;

        return new ResponseEntity<List<User>>(users,HttpStatus.OK) ;
    }

    @GetMapping("/search")
    public ResponseEntity<List<User>> searchUserHandler(@RequestParam("q") String query) throws UserException {
        List<User> users = userService.searchUser(query) ;
        return new ResponseEntity<List<User>>(users,HttpStatus.OK) ;
    }

    @PutMapping("/account/edit")
    public ResponseEntity<User> updateUserHandler(@RequestHeader("Authorization") String token, @RequestBody User user) throws UserException{
        User reqUser = userService.findUserProfile(token) ;

        User updatedUser = userService.updateUserDetails(user,reqUser) ;
        System.out.println("edited user: "+updatedUser) ;
        return new ResponseEntity<User>(updatedUser, HttpStatus.OK) ;
    }

    @GetMapping("/suggestions")
    public ResponseEntity<List<UserDto>> getSuggestionsUserHandler(@RequestHeader("Authorization") String token) throws UserException{
        User reqUser = userService.findUserProfile(token) ;

        List<UserDto> popularUsers = userService.getUsersSuggestionToFollow(reqUser) ;

        return new ResponseEntity<List<UserDto>>(popularUsers, HttpStatus.OK) ;
    }
}
