package me.project.SpringProject.langResponse;

import lombok.Builder;
import lombok.Data;

@Data
@Builder

public class BoardUserResponse {

    private String requiredTests;
    private String passedTests;
    private String take;
    private String pass;

}
