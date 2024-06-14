package com.application.instagrambackend.repository;

import com.application.instagrambackend.modal.User;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    @Query("select u from User u where u.id IN :users")
    List<User> findAllUsersByUserIds(@Param("users") List<Integer> userIds) ;

    @Query("select distinct u from User u where u.username LIKE %:query% OR u.email LIKE %:query%")
    List<User> findByQuery(@Param("query") String query) ;

    Optional<User> findByEmail(String email) ;

    Optional<User> findByUsername(String username) ;
}
