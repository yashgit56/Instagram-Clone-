package com.application.instagrambackend.modal;

import com.application.instagrambackend.dto.UserDto;
import jakarta.persistence.*;
import org.antlr.v4.runtime.misc.NotNull;

import java.time.LocalDateTime;

@Entity
@Table(name = "stories")
public class Story {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id ;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name="id",column=@Column(name="user_id")),
            @AttributeOverride(name = "email", column=@Column(name = "user_email")),
    })
    private UserDto user ;

    private String image ;

    private String caption ;

    private LocalDateTime timestamp ;

    public Story() {

    }

    public Story(UserDto user, Integer id, String image, String caption, LocalDateTime timestamp) {
        this.user = user;
        this.id = id;
        this.image = image;
        this.caption = caption;
        this.timestamp = timestamp;
    }

    @Override
    public String toString() {
        return "Story{" +
                "id=" + id +
                ", user=" + user +
                ", image='" + image + '\'' +
                ", caption='" + caption + '\'' +
                ", timestamp=" + timestamp +
                '}';
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public UserDto getUser() {
        return user;
    }

    public void setUser(UserDto user) {
        this.user = user;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getCaption() {
        return caption;
    }

    public void setCaption(String caption) {
        this.caption = caption;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
