package me.project.SpringProject.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder

public class UpdateUserRequest {

    private String firstName;
    private String lastName;

}
