package me.project.SpringProject.service;

import lombok.extern.slf4j.Slf4j;
import me.project.SpringProject.entity.Test;
import me.project.SpringProject.repository.TestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
public class TestService {

    private final TestRepository testRepository;

    @Autowired
    TestService(TestRepository testRepository) {
        this.testRepository = testRepository;
    }

    public Optional<Test> findById(Long id){
        return testRepository.findById(id);
    }


}
