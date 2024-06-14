package com.application.instagrambackend.service;

import com.application.instagrambackend.exception.StoryException;
import com.application.instagrambackend.exception.UserException;
import com.application.instagrambackend.modal.Story;

import java.util.List;

public interface StoryService {

    public Story createStory(Story story, Integer userId) throws UserException ;

    public List<Story> findStoryByUserId(Integer userId) throws UserException, StoryException;
}
