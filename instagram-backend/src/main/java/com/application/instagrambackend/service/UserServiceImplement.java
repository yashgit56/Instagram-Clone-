package com.application.instagrambackend.service;

import com.application.instagrambackend.Security.JwTokenClaims;
import com.application.instagrambackend.Security.JwtTokenProvider;
import com.application.instagrambackend.dto.UserDto;
import com.application.instagrambackend.exception.UserException;
import com.application.instagrambackend.modal.User;
import com.application.instagrambackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserServiceImplement implements UserService  {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder ;

    @Autowired
    private JwtTokenProvider jwTokenProvider ;

    @Override
    public User registerUser(User user) throws UserException {
        Optional<User> isEmailExist = userRepo.findByEmail(user.getEmail()) ;

        if(isEmailExist.isPresent()){
            throw new UserException("User already exist with that email") ;
        }

        Optional<User> isUsernameExist = userRepo.findByUsername(user.getUsername()) ;

        if(isUsernameExist.isPresent()){
            throw new UserException("User already exist with that username") ;
        }

        if(user.getEmail()==null || user.getPassword()==null || user.getUsername()==null || user.getName() == null){
            throw new UserException("All fields are required") ;
        }

        User newUser = new User() ;
        newUser.setEmail(user.getEmail()) ;
        newUser.setUsername(user.getUsername()) ;
        newUser.setName(user.getName()) ;
        newUser.setPassword(passwordEncoder.encode(user.getPassword())) ;

        return userRepo.save(newUser) ;
    }

    @Override
    public User findUserById(Integer userId) throws UserException {
        Optional<User> opt = userRepo.findById(userId) ;

        return opt.orElse(null);
    }

    @Override
    public User findUserProfile(String token) throws UserException {

        token = token.substring(7) ;
        JwTokenClaims jwTokenClaims = jwTokenProvider.getClaimsFromToken(token);

        String email = jwTokenClaims.getUsername() ;

        Optional<User> opt = userRepo.findByEmail(email) ;

        return opt.orElse(null);
    }

    @Override
    public User findUserByUsername(String username) throws UserException {
        Optional<User> opt = userRepo.findByUsername(username) ;

        return opt.orElse(null);
    }

    @Override
    public String followUser(Integer reqUserId, Integer followUserId) throws UserException {
        User reqUser = findUserById(reqUserId) ;
        User followUser = findUserById(followUserId);

        UserDto follower = new UserDto();
        follower.setEmail(reqUser.getEmail());
        follower.setId(reqUser.getId());
        follower.setName(reqUser.getName()) ;
        follower.setUserImage(reqUser.getImage());
        follower.setUsername(reqUser.getUsername());

        UserDto following = new UserDto();
        following.setEmail(followUser.getEmail());
        following.setId(followUser.getId());
        following.setUsername(followUser.getUsername());
        following.setUserImage(followUser.getImage());
        following.setName(followUser.getName());

        reqUser.getFollowing().add(following) ;
        followUser.getFollower().add(follower) ;

        userRepo.save(followUser) ;
        userRepo.save(reqUser) ;

        return "You are following "+ followUser.getUsername() ;
    }

    @Override
    public String unfollowUser(Integer reqUserId, Integer followUserId) throws UserException {
        User reqUser = findUserById(reqUserId) ;
        User followUser = findUserById(followUserId);

        UserDto follower = new UserDto();
        follower.setEmail(reqUser.getEmail());
        follower.setId(reqUser.getId());
        follower.setName(reqUser.getName()) ;
        follower.setUserImage(reqUser.getImage());
        follower.setUsername(reqUser.getUsername());

        UserDto following = new UserDto();
        following.setEmail(followUser.getEmail());
        following.setId(followUser.getId());
        following.setUsername(followUser.getUsername());
        following.setUserImage(followUser.getImage());
        following.setName(followUser.getName());

        reqUser.getFollowing().remove(following) ;
        followUser.getFollower().remove(follower) ;

        userRepo.save(followUser) ;
        userRepo.save(reqUser) ;

        return "You have unfollowed "+ followUser.getUsername() ;
    }

    @Override
    public List<User> findUserByIds(List<Integer> userIds) throws UserException {
        List<User> users = userRepo.findAllUsersByUserIds(userIds);

        return users;
    }

    @Override
    public List<User> searchUser(String query) throws UserException {
        List<User> users = userRepo.findByQuery(query) ;

        return users ;
    }

    @Override
    public User updateUserDetails(User updatedUser, User existingUser) throws UserException {

        if(updatedUser.getEmail() != null){
            existingUser.setEmail(updatedUser.getEmail()) ;
        }
        if(updatedUser.getBio() != null){
            existingUser.setBio(updatedUser.getBio()) ;
        }
        if(updatedUser.getName() != null){
            existingUser.setName(updatedUser.getName()) ;
        }
        if(updatedUser.getUsername() != null){
            existingUser.setUsername(updatedUser.getUsername()) ;
        }
        if(updatedUser.getMobile() != null){
            existingUser.setMobile(updatedUser.getMobile()) ;
        }
        if(updatedUser.getGender() != null){
            existingUser.setGender(updatedUser.getGender()) ;
        }
        if(updatedUser.getWebsite() != null){
            existingUser.setWebsite(updatedUser.getWebsite()) ;
        }
        if(updatedUser.getImage() != null){
            existingUser.setImage(updatedUser.getImage()) ;
        }

        if(updatedUser.getId().equals(existingUser.getId())){
            return userRepo.save(existingUser) ;
        }
        return null;
    }

    @Override
    public List<UserDto> getUsersSuggestionToFollow(User reqUser) throws UserException {
        if (reqUser == null) {
            return List.of();
        }

        // Fetch all users from the repository
        List<User> allUsers = userRepo.findAll();

        // Convert following users to a set of UserDto for easy comparison
        Set<UserDto> following = reqUser.getFollowing().stream()
                .map(user -> new UserDto(user.getId(), user.getEmail(), user.getName(), user.getUsername(), user.getUserImage()))
                .collect(Collectors.toSet());

        // Filter out users who are already followed and the requesting user themselves

        return allUsers.stream()
                .filter(user -> !user.getId().equals(reqUser.getId())) // Exclude the requesting user
                .filter(user -> !following.contains(new UserDto(user.getId(), user.getEmail(), user.getName(), user.getUsername(), user.getImage()))) // Exclude already followed users
                .map(user -> new UserDto(user.getId(), user.getEmail(), user.getName(), user.getUsername(), user.getImage())) // Convert to UserDto
                .collect(Collectors.toList());
    }
}
