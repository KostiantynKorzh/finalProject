package me.project.SpringProject.request;

import lombok.Builder;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@Data
@Builder

public class UpdateUserRequest {

    @NotNull
    @Length(min = 3, max = 25)
    @Pattern(regexp = "^[a-zA-Zа-яА-ЯёъїґЇҐєЄіІ]+$")
    private String firstName;

    @NotNull
    @Length(min = 3, max = 25)
    @Pattern(regexp = "^[a-zA-Zа-яА-ЯёъїґЇҐєЄіІ]+$+")
    private String lastName;

}
