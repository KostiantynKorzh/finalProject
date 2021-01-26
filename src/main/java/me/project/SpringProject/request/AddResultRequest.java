package me.project.SpringProject.request;

import lombok.Data;

@Data

public class AddResultRequest {

    private Long userId;
    private Long testId;
    private Double score;

}
