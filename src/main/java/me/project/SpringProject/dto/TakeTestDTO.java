package me.project.SpringProject.dto;

import lombok.Builder;
import lombok.Data;
import me.project.SpringProject.entity.Question;
import me.project.SpringProject.entity.Test;

import java.util.List;
import java.util.Set;

@Data
@Builder
public class TakeTestDTO {

    private Test test;
    private Set<Question> questions;


}
