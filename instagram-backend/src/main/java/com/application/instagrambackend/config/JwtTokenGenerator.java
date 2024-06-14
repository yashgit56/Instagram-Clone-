package com.application.instagrambackend.config;

import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.boot.autoconfigure.neo4j.Neo4jProperties;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.crypto.SecretKey;
import io.jsonwebtoken.security.Keys;
import java.io.IOException;
import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

public class JwtTokenGenerator extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if(authentication != null){
            SecretKey key = Keys.hmacShaKeyFor(SecurityContext.JWT_KEY.getBytes());

            String jwt = Jwts.builder()
                    .setIssuer("instagram")
                    .setIssuedAt(new Date())
                    .claim("authorities",populateAuthorities(authentication.getAuthorities()))
                    .claim("username",authentication.getName())
                    .setExpiration(new Date(new Date().getTime()+30000000))
                    .signWith(key).compact() ;

            response.setHeader(SecurityContext.HEADER,jwt);
        }

        filterChain.doFilter(request,response);
    }

    public String populateAuthorities(Collection<? extends  GrantedAuthority> collection) {
        Set<String> authorites = new HashSet<>() ;

        for(GrantedAuthority authority: collection) {
            authorites.add(authority.getAuthority());
        }

        return String.join(",", authorites) ;
    }

    protected boolean shouldNotFilter(HttpServletRequest request) throws  ServletException {
        return !request.getServletPath().equals("/signin");
    }
}
