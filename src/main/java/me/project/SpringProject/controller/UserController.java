package me.project.SpringProject.controller;

import me.project.SpringProject.entity.*;
import me.project.SpringProject.repository.*;
import me.project.SpringProject.request.AddTestRequest;
import me.project.SpringProject.userDetails.UserDetailsAuth;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
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
    QuestionRepository questionRepository;

    @Autowired
    RequiredTestRepository requiredTestRepository;

    @Autowired
    TestRepository testRepository;

    @Autowired
    ResultRepository resultRepository;

//    @GetMapping
//    public ResponseEntity<?> getUser(Authentication authentication) {
//        UserDetailsAuth userPrincipal = (UserDetailsAuth) authentication.getPrincipal();
//        User user = userRepository.findById(userPrincipal.getId()).get();
//        return ResponseEntity.ok(user);
//    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUser(@PathVariable Long id) {
        User user = userRepository.findById(id).get();
        return ResponseEntity.ok(user);
    }

    @GetMapping("/all")
    public ResponseEntity<?> getHomeContent() {
        return ResponseEntity.ok("Home Content");
    }

    @GetMapping("/{id}/tests/passed")
    public ResponseEntity<?> getAllPassedTests(@PathVariable Long id) {
        User user = userRepository.findById(id).get();
        Set<Result> passedResults = resultRepository.findAllByUser(user);
        Set<Test> passedTests = new HashSet<>();
        passedResults.forEach(result -> passedTests.add(result.getTest()));
        return ResponseEntity.ok(passedTests);
    }

    @GetMapping("/{id}/tests/available")
    public ResponseEntity<?> getAllAvailableTests(@PathVariable Long id) {
        User user = userRepository.findById(id).get();
        List<Test> allTests = testRepository.findAll();
        Set<Test> passedTests = new HashSet<>();
        resultRepository.findAllByUser(user).forEach(res -> passedTests.add(res.getTest()));
        Set<Test> requiredTests = new HashSet<>();
        requiredTestRepository.findAllByUser(user).forEach(req -> requiredTests.add(req.getTest()));
        allTests.removeAll(requiredTests);
        allTests.removeAll(passedTests);
        return ResponseEntity.ok(allTests);
    }

    @GetMapping("/{id}/tests/required")
    public ResponseEntity<?> getAllRequiredTests(@PathVariable Long id) {
        User user = userRepository.findById(id).get();
        Set<RequiredTest> requiredTests = requiredTestRepository.findAllByUser(user);
        Set<Test> tests = new HashSet<>();
        requiredTests.forEach(testReq -> tests.add(testReq.getTest()));
        return ResponseEntity.ok(tests);
    }

    @PostMapping("/{id}/test")
    public ResponseEntity<?> passTest(@PathVariable Long id, @RequestBody AddTestRequest req) {
        User user = userRepository.findById(id).get();
        Test test = testRepository.findById(req.getTestId()).get();
        RequiredTest requiredTest = requiredTestRepository.findByUserAndTest(user, test).get();
        requiredTestRepository.delete(requiredTest);
        Result result = Result.builder()
                .test(test)
                .user(user)
                .score(30.0)
                .passTimestamp(new Timestamp(System.currentTimeMillis()))
                .build();
        resultRepository.save(result);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/{id}/takeTest/{testId}")
    public ResponseEntity<?> getTest(@PathVariable Long id, @PathVariable Long testId) {
        User user = userRepository.findById(id).get();
        Test test = testRepository.findById(testId).get();
        RequiredTest requiredTest = requiredTestRepository.findByUserAndTest(user, test).get();
        return ResponseEntity.ok(requiredTest.getTest());
    }

}
