package me.project.SpringProject.lang;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor

public class HeaderLangResponse {

    private String home;
    private String users;
    private String tests;
    private String allTests;
    private String createTest;
    private String user;
    private String profile;
    private String logout;
    private String lang;
    private String signup;
    private String login;
    private String passedTests;
    private String requiredTests;

}
