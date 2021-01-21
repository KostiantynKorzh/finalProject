package me.project.SpringProject.request;

import lombok.Data;

import java.sql.Timestamp;

@Data

public class CreateTestRequest {

    private String title;
    private String subject;
    private String difficulty;

}
