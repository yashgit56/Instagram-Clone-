package com.application.instagrambackend.service;

import com.application.instagrambackend.dto.UserDto;
import com.application.instagrambackend.exception.StoryException;
import com.application.instagrambackend.exception.UserException;
import com.application.instagrambackend.modal.Story;
import com.application.instagrambackend.modal.User;
import com.application.instagrambackend.repository.StoryRepository;
import com.application.instagrambackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class StoryServiceImplementation implements StoryService {

    @Autowired
    private StoryRepository storyRepo ;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepo ;

    public Story createStory(Story story, Integer userId) throws UserException{
        User user = userService.findUserById(userId) ;

        UserDto userDto = new UserDto();
        userDto.setEmail(user.getEmail());
        userDto.setId(user.getId());
        userDto.setName(user.getName());
        userDto.setUserImage(user.getImage());
        userDto.setUsername(user.getUsername());

        story.setUser(userDto);
        story.setTimestamp(LocalDateTime.now());

        user.getStories().add(story) ;

        return storyRepo.save(story) ;
    }

    public List<Story> findStoryByUserId(Integer userId) throws UserException, StoryException {
        User user = userService.findUserById(userId) ;

        List<Story> stories = user.getStories();

        return stories ;
    }

}
