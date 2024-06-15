package com.application.instagrambackend.controller;

import com.application.instagrambackend.exception.StoryException;
import com.application.instagrambackend.exception.UserException;
import com.application.instagrambackend.modal.Story;
import com.application.instagrambackend.modal.User;
import com.application.instagrambackend.service.StoryService;
import com.application.instagrambackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stories")
@CrossOrigin(origins = "http://localhost:3000")
public class StoryController {

    @Autowired
    private UserService userService ;

    @Autowired
    private StoryService storyService ;

    @PostMapping("/create")
    public ResponseEntity<Story> createStoryHandler(@RequestBody Story story, @RequestHeader("Authorization") String token) throws UserException {
        User user = userService.findUserProfile(token) ;

        Story createdStory = storyService.createStory(story, user.getId()) ;

        return new ResponseEntity<Story>(createdStory, HttpStatus.OK) ;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<Story>> findAllStoryByUserIdHandler(@PathVariable Integer userId) throws UserException, StoryException {
        User user = userService.findUserById(userId) ;

        List<Story> stories = storyService.findStoryByUserId(user.getId()) ;

        return new ResponseEntity<List<Story>>(stories, HttpStatus.OK) ;
    }

    @GetMapping("/f/{userId} ")
    public ResponseEntity<List<Story>> findAllFollowingUserStoryHandler(@PathVariable Integer userId) throws StoryException, UserException {
        List<Story> followingUserStories = storyService.findFollowingUserStoryHandler(userId) ;

        return new ResponseEntity<List<Story>>(followingUserStories,HttpStatus.OK) ;
    }
}
