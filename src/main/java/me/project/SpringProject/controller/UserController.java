package me.project.SpringProject.controller;

import me.project.SpringProject.entity.RequiredTest;
import me.project.SpringProject.entity.Result;
import me.project.SpringProject.entity.Test;
import me.project.SpringProject.entity.User;
import me.project.SpringProject.repository.RequiredTestRepository;
import me.project.SpringProject.repository.ResultRepository;
import me.project.SpringProject.repository.TestRepository;
import me.project.SpringProject.repository.UserRepository;
import me.project.SpringProject.request.AddTestRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@CrossOrigin(origins = "*", allowedHeaders = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    RequiredTestRepository requiredTestRepository;

    @Autowired
    TestRepository testRepository;

    @Autowired
    ResultRepository resultRepository;

    @GetMapping("/{id}/tests/passed")
    public ResponseEntity<?> getAllPassedTests(@PathVariable Long id) {
        User user = userRepository.findById(id).get();
        Set<Result> passedResults = resultRepository.findAllByUser(user);
        Set<Test> passedTests = new HashSet<>();
        passedResults.forEach(result -> passedTests.add(result.getTest()));
        return ResponseEntity.ok(passedTests);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*", maxAge = 3600)
    @GetMapping("/{id}/tests/available")
    public ResponseEntity<?> getAllAvailableTests(@PathVariable Long id) {
        User user = userRepository.findById(id).get();
        List<Test> allTests = testRepository.findAll();
        Set<Test> passedTests = new HashSet<>();
        resultRepository.findAllByUser(user).forEach(res -> passedTests.add(res.getTest()));
        Set<Test> requiredTests = new HashSet<>();
        requiredTestRepository.findAllByUser(user).forEach(req -> requiredTests.add(req.getTest()));
        allTests.remove(passedTests);
        allTests.remove(requiredTests);
        return ResponseEntity.ok(allTests);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*", maxAge = 3600)
    @GetMapping("/{id}/tests/required")
    public ResponseEntity<?> getAllRequiredTests(@PathVariable Long id) {
        User user = userRepository.findById(id).get();
        Set<RequiredTest> requiredTests = requiredTestRepository.findAllByUser(user);
        Set<Test> tests = new HashSet<>();
        requiredTests.forEach(testReq -> tests.add(testReq.getTest()));
//        System.out.println("requiredTests = " + requiredTests);
        return ResponseEntity.ok(tests);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*", maxAge = 3600)
    @PostMapping("/{id}/test")
    public ResponseEntity<?> passTest(@PathVariable Long id, @RequestBody AddTestRequest req) {
        User user = userRepository.findById(id).get();
        Test test = testRepository.findById(req.getTestId()).get();
        RequiredTest requiredTest = requiredTestRepository.findByUserAndTest(user, test).get();
        requiredTestRepository.delete(requiredTest);
//        test.getUsersRequired().remove(user);
//        test.getUsersPassed().add(user);
        Result result = Result.builder()
                .test(test)
                .user(user)
                .score(30.0)
                .passTimestamp(new Timestamp(System.currentTimeMillis()))
                .build();
        resultRepository.save(result);
        return ResponseEntity.ok(result);
    }


}
