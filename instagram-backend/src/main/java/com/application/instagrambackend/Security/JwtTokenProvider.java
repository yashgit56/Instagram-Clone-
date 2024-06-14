package com.application.instagrambackend.Security;

import com.application.instagrambackend.config.SecurityContext;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;

@Service
public class JwtTokenProvider {

    public JwTokenClaims getClaimsFromToken(String token){
        SecretKey key = Keys.hmacShaKeyFor(SecurityContext.JWT_KEY.getBytes());

        Claims claims = Jwts.parser().setSigningKey(key).build().parseClaimsJws(token).getBody() ;

        String username = String.valueOf(claims.get("username"));

        JwTokenClaims jwtTokenClaims = new JwTokenClaims() ;
        jwtTokenClaims.setUsername(username);

        return jwtTokenClaims ;
    }

}
