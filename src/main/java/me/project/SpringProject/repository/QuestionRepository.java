package me.project.SpringProject.repository;

import me.project.SpringProject.entity.Question;
import me.project.SpringProject.entity.Test;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    Set<Question> findAllByTest(Test test);
}
