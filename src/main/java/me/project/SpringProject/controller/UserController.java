package me.project.SpringProject.controller;

import me.project.SpringProject.entity.*;
import me.project.SpringProject.repository.*;
import me.project.SpringProject.request.AddTestRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
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
    QuestionRepository questionRepository;

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
        allTests.removeAll(requiredTests);
        allTests.removeAll(passedTests);
        return ResponseEntity.ok(allTests);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*", maxAge = 3600)
    @GetMapping("/{id}/tests/required")
    public ResponseEntity<?> getAllRequiredTests(@PathVariable Long id) {
        User user = userRepository.findById(id).get();
        Set<RequiredTest> requiredTests = requiredTestRepository.findAllByUser(user);
        Set<Test> tests = new HashSet<>();
        requiredTests.forEach(testReq -> tests.add(testReq.getTest()));
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
//                .passTimestamp(new Timestamp(System.currentTimeMillis()))
                .passTimestamp(new Timestamp(3))
                .build();
        resultRepository.save(result);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/{id}/takeTest/{testId}")
    public ResponseEntity<?> getTest(@PathVariable Long id, @PathVariable Long testId) {
        User user = userRepository.findById(id).get();
        Test test = testRepository.findById(testId).get();
        Set<Question> questions = questionRepository.findAllByTest(test);
//        System.out.println(questions.size());
        RequiredTest requiredTest = requiredTestRepository.findByUserAndTest(user, test).get();
        requiredTest.getTest().setQuestions(questions);
//        System.out.println(requiredTest.getTest());
        return ResponseEntity.ok(requiredTest.getTest());
    }


}
