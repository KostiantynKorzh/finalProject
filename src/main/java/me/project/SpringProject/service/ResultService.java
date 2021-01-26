package me.project.SpringProject.service;

import lombok.extern.slf4j.Slf4j;
import me.project.SpringProject.entity.Result;
import me.project.SpringProject.entity.Test;
import me.project.SpringProject.entity.User;
import me.project.SpringProject.repository.ResultRepository;
import me.project.SpringProject.repository.TestRepository;
import me.project.SpringProject.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Optional;

@Slf4j
@Service
public class ResultService {

    private ResultRepository resultRepository;

    @Autowired
    private TestRepository testRepository;

    @Autowired
    private RequiredTestService requiredTestService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    ResultService(ResultRepository resultRepository) {
        this.resultRepository = resultRepository;
    }

    // could be required test
    public Optional<Result> addResult(Long userId, Long testId, Double score) {
        requiredTestService.removeFromRequiredTest(userId, testId);
        Test test = testRepository.findById(testId).get();
        User user = userRepository.findById(userId).get();
        return Optional.of(resultRepository.save(Result.builder()
                .passTimestamp(new Timestamp(System.currentTimeMillis()))
                .test(test)
                .user(user)
                .score(score)
                .build()));
    }

}
