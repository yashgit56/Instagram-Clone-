package com.application.instagrambackend.service;

import com.application.instagrambackend.modal.User;
import com.application.instagrambackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepo ;

    public UserUserDetailsService() {
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> opt = userRepo.findByUsername(username) ;

        if(opt.isPresent()){
            User user = opt.get();

            List<GrantedAuthority> authorites = new ArrayList<>() ;

            return new org.springframework.security.core.userdetails.User(user.getEmail(),user.getPassword(), authorites) ;
        }

        throw new BadCredentialsException("User not found with that username " + username) ;
    }
}
