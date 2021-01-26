package me.project.SpringProject.service;

import lombok.extern.slf4j.Slf4j;
import me.project.SpringProject.entity.RoleType;
import me.project.SpringProject.entity.Test;
import me.project.SpringProject.entity.User;
import me.project.SpringProject.repository.TestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class TestService {

    private final TestRepository testRepository;

    @Autowired
    TestService(TestRepository testRepository) {
        this.testRepository = testRepository;
    }

    public Optional<Test> findById(Long id) {
        return testRepository.findById(id);
    }

    public Page<Test> getAllSorted(String param, Integer page) {
        Page<Test> tests;
        Sort sort;
        if (param == null || param.isEmpty()) {
            sort = Sort.by("id");
        } else {
            sort = Sort.by(param);
        }
        Pageable paging = PageRequest.of(page, 2, sort);
//        tests = testRepository.findAll(sort);
        tests = testRepository.findAll(paging);
        return tests;
    }

}
