package me.project.SpringProject.request;

import lombok.Data;
import me.project.SpringProject.entity.Answer;

import java.util.List;
import java.util.Set;

@Data

public class CreateQuestion {

    private String questionText;
    private Set<Answer> answers;

}
