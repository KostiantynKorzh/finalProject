package me.project.SpringProject.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ResultDTO {

    private String title;
    private String subject;
    private String difficulty;
    private Integer score;
    private String passTimestamp;

}
