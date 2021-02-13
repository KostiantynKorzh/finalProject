package me.project.SpringProject.controller;

import me.project.SpringProject.entity.RequiredTest;
import me.project.SpringProject.entity.Test;
import me.project.SpringProject.entity.User;
import me.project.SpringProject.repository.RequiredTestRepository;
import me.project.SpringProject.repository.TestRepository;
import me.project.SpringProject.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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
    TestService testService;

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
        testRepository.deleteById(testId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/sorted")
    public ResponseEntity<?> sortedTests(@RequestParam(required = false) String param,
                                         @RequestParam(required = false) Integer page) {
        Page<Test> tests = testService.getAllSorted(param, page);
        return ResponseEntity.ok(tests);
    }

}
