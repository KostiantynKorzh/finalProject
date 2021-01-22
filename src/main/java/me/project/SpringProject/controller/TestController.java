package me.project.SpringProject.controller;

import me.project.SpringProject.entity.RequiredTest;
import me.project.SpringProject.entity.Test;
import me.project.SpringProject.repository.RequiredTestRepository;
import me.project.SpringProject.repository.TestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@CrossOrigin(origins = "*", allowedHeaders = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/tests")
public class TestController {

    @Autowired
    TestRepository testRepository;

    @Autowired
    RequiredTestRepository requiredTestRepository;

    @GetMapping("/all")
    public ResponseEntity<?> getTests() {
        List<Test> tests = testRepository.findAll();
        return ResponseEntity.ok(tests);
    }

    @DeleteMapping("/delete/{testId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteTest(@PathVariable Long testId) {
        Test test = testRepository.findById(testId).get();
//        requiredTestRepository.deleteAllByTest(test);
        testRepository.deleteById(testId);
        return ResponseEntity.ok().build();
    }


}
