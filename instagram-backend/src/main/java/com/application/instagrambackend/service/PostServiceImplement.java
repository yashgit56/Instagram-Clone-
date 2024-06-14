package com.application.instagrambackend.service;

import com.application.instagrambackend.dto.UserDto;
import com.application.instagrambackend.exception.PostException;
import com.application.instagrambackend.exception.UserException;
import com.application.instagrambackend.modal.Post;
import com.application.instagrambackend.modal.User;
import com.application.instagrambackend.repository.PostRepository;
import com.application.instagrambackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PostServiceImplement implements PostService{

    @Autowired
    private PostRepository postRepo;

    @Autowired
    private UserService userService ;

    @Autowired
    private UserRepository userRepo ;

    @Override
    public Post createPost(Post post, Integer userId) throws UserException {
        User user = userService.findUserById(userId) ;

        UserDto userDto = new UserDto();
        userDto.setEmail(user.getEmail());
        userDto.setId(user.getId());
        userDto.setUserImage(user.getImage());
        userDto.setName(user.getName());
        userDto.setUsername(user.getUsername());

        post.setUser(userDto);

        Post createdPost = postRepo.save(post) ;

        return createdPost ;
    }

    @Override
    public Post findPostById(Integer postId) throws PostException {
        Optional<Post> opt = postRepo.findById(postId) ;

        return opt.orElse(null);
    }

    @Override
    public List<Post> findPostByUserId(Integer userId) throws PostException {

        return postRepo.findByUserId(userId);
    }

    @Override
    public List<Post> findAllPostByUserIds(List<Integer> userIds) throws UserException, PostException {
        return postRepo.findAllPostByUserIds(userIds) ;
    }

    @Override
    public String deletePost(Integer postId, Integer userId) throws UserException, PostException {
        Post post = findPostById(postId) ;

        User user = userService.findUserById(userId) ;

        if(post.getUser().getId().equals(user.getId())){
            postRepo.deleteById(post.getId());
            return "Post deleted successfully" ;
        }
        return "you are unauthorized to delete this post" ;
    }

    @Override
    public String savedPost(Integer postId, Integer userId) throws UserException, PostException {
        Post post = findPostById(postId) ;

        User user = userService.findUserById(userId) ;

        if(!user.getSavedPost().contains(post)){
            user.getSavedPost().add(post);
            userRepo.save(user) ;
        }

        return "Post saved successfully" ;
    }

    @Override
    public String unSavedPost(Integer postId, Integer userId) throws UserException, PostException {
        Post post = findPostById(postId) ;

        User user = userService.findUserById(userId) ;

        if(!user.getSavedPost().contains(post)){
            user.getSavedPost().remove(post);
            userRepo.save(user) ;
        }

        return "Post removed successfully" ;
    }

    @Override
    public Post likePost(Integer postId, Integer userId) throws UserException, PostException {
        Post post = findPostById(postId);

        User user = userService.findUserById(userId) ;

        UserDto userDto = new UserDto() ;
        userDto.setEmail(user.getEmail());
        userDto.setId(user.getId());
        userDto.setUserImage(user.getImage());
        userDto.setName(user.getName());
        userDto.setUsername(user.getUsername());

        post.getLikedByUsers().add(userDto) ;

        return postRepo.save(post) ;
    }

    @Override
    public Post unlikePost(Integer postId, Integer userId) throws UserException, PostException {
        Post post = findPostById(postId);

        User user = userService.findUserById(userId) ;

        UserDto userDto = new UserDto() ;
        userDto.setEmail(user.getEmail());
        userDto.setId(user.getId());
        userDto.setUserImage(user.getImage());
        userDto.setName(user.getName());
        userDto.setUsername(user.getUsername());

        post.getLikedByUsers().remove(userDto) ;

        return postRepo.save(post) ;
    }
}
