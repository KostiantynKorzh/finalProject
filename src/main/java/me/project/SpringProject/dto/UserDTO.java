package me.project.SpringProject.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
@Builder
public class UserDTO {

    private static final String TYPE = "Bearer ";

    private String token;
    private Long id;
    private String username;
    private String email;
    private boolean accountNonLocked;
    private List<String> roles;


}
