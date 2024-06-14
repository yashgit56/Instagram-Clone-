package com.application.instagrambackend.repository;

import com.application.instagrambackend.modal.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {

    @Query("select p from Post p where p.user.id=?1")
    List<Post> findByUserId(Integer userId) ;

    @Query("select p from Post p where p.user.id IN :users ORDER BY p.createdAt DESC")
    List<Post> findAllPostByUserIds(@Param("users") List<Integer> userIds) ;
}
