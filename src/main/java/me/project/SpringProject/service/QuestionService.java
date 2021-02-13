package me.project.SpringProject.service;

import lombok.extern.slf4j.Slf4j;
import me.project.SpringProject.entity.Answer;
import me.project.SpringProject.entity.Question;
import me.project.SpringProject.entity.Test;
import me.project.SpringProject.repository.AnswerRepository;
import me.project.SpringProject.repository.QuestionRepository;
import me.project.SpringProject.repository.TestRepository;
import me.project.SpringProject.request.CreateQuestion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@Service
public class QuestionService {

    private QuestionRepository questionRepository;

    @Autowired
    private TestService testService;

    @Autowired
    private AnswerRepository answerRepository;

    @Autowired
    public QuestionService(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    public Question createQuestion(Long testId, CreateQuestion req) {
        Test test = testService.getTest(testId);

        Question question = Question.builder()
                .questionText(req.getQuestionText())
                .test(test)
                .build();
        questionRepository.save(question);

        Set<Answer> answers = req.getAnswers().stream().map(answer -> Answer.builder()
                .answerText(answer.getAnswerText())
                .isCorrect(answer.isCorrect())
                .question(question)
                .build()).collect(Collectors.toSet());
        for (Answer answer : answers) {
            answerRepository.save(answer);
        }
        return question;
    }

}
