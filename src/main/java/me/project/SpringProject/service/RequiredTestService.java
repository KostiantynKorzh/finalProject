package me.project.SpringProject.service;

import lombok.extern.slf4j.Slf4j;
import me.project.SpringProject.entity.RequiredTest;
import me.project.SpringProject.entity.Result;
import me.project.SpringProject.entity.Test;
import me.project.SpringProject.entity.User;
import me.project.SpringProject.repository.RequiredTestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.Optional;

@Slf4j
@Service
public class RequiredTestService {

    private final RequiredTestRepository requiredTestRepository;

    @Autowired
    RequiredTestService(RequiredTestRepository requiredTestRepository) {
        this.requiredTestRepository = requiredTestRepository;
    }

    public Optional<RequiredTest> addRequiredTest(User user, Test test) {
        RequiredTest requiredTestCheck = requiredTestRepository.findByUserAndTest(user, test)
                .orElse(RequiredTest.builder()
                        .test(test)
                        .user(user)
                        .build());
        requiredTestRepository.save(requiredTestCheck);
        return Optional.of(requiredTestCheck);
    }

    @Transactional
    public void removeFromRequiredTest(Long userId, Long testId) {
        requiredTestRepository.deleteByUserIdAndTestId(userId, testId);
    }

}
