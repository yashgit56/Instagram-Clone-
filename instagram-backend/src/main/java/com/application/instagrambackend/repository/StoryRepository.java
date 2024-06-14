package com.application.instagrambackend.repository;

import com.application.instagrambackend.modal.Story;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StoryRepository extends JpaRepository<Story, Integer> {

    @Query("select s from Story s where s.user.id = :userId ")
    List<Story> findAllStoryByUserid(@Param("userId") Integer userid);

}
