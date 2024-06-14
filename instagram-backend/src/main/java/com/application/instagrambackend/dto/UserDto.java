package com.application.instagrambackend.dto;

import jakarta.persistence.Id;
import lombok.Data;

import java.util.Objects;

@Data
public class UserDto {

    private Integer id ;
    private String email ;
    private String name ;
    private String username ;
    private String userImage ;

    public UserDto() {

    }

    public UserDto(Integer id, String email, String name, String username, String userImage) {
        super();
        this.id = id;
        this.email = email;
        this.name = name;
        this.username = username;
        this.userImage = userImage;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserDto userDto = (UserDto) o;
        return Objects.equals(id, userDto.id) && Objects.equals(email, userDto.email) && Objects.equals(name, userDto.name) && Objects.equals(username, userDto.username) && Objects.equals(userImage, userDto.userImage);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, email, name, username, userImage);
    }
}
