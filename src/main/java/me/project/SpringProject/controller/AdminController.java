package me.project.SpringProject.controller;

import me.project.SpringProject.entity.*;
import me.project.SpringProject.repository.*;
import me.project.SpringProject.request.AddTestRequest;
import me.project.SpringProject.request.CreateQuestion;
import me.project.SpringProject.request.CreateTestRequest;
import me.project.SpringProject.request.UpdateUserRequest;
import me.project.SpringProject.service.TestService;
import me.project.SpringProject.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", allowedHeaders = "*", maxAge = 3600)
@RestController
@PreAuthorize("hasRole('ADMIN')")
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    QuestionRepository questionRepository;

    @Autowired
    RequiredTestRepository requiredTestRepository;

    @Autowired
    ResultRepository resultRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    TestRepository testRepository;

    @Autowired
    AnswerRepository answerRepository;

    @Autowired
    UserService userService;

    @Autowired
    TestService testService;

    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getAllUsersByRoles() {
        List<User> users = userRepository.findAllByRoles(
                roleRepository.findByName(RoleType.ROLE_USER).get());
        return ResponseEntity.ok(users);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*", maxAge = 3600)
    @DeleteMapping("/users/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        userService.delete(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/users/edit/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody UpdateUserRequest req) {
        return userService.updateUser(id, req);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*", maxAge = 3600)
    @GetMapping("/users/addTests/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getAllRequiredTests(@PathVariable Long id) {
        User user = userRepository.findById(id).get();
        Set<RequiredTest> requiredTests = requiredTestRepository.findAllByUser(user);
        return ResponseEntity.ok(requiredTests);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*", maxAge = 3600)
    @PostMapping("/users/addTests/add/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> addTestsToUser(@PathVariable Long id, @RequestBody AddTestRequest req) {
        return ResponseEntity.ok(userService.addTestsToUser(id, req));
    }

    @PostMapping("/createTest")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createTest(@RequestBody CreateTestRequest req) {
        Test test = Test.builder()
                .title(req.getTitle())
                .subject(Subjects.valueOf(req.getSubject()))
                .difficulty(Difficulties.valueOf(req.getDifficulty()))
                .duration(req.getDuration())
                .created(new Date(System.currentTimeMillis()))
                .build();
        testRepository.save(test);
        return ResponseEntity.ok(test);
    }

    @GetMapping("/testToFill/{testId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getTest(@PathVariable Long testId) {
        Test test = testRepository.findById(testId).get();
        return ResponseEntity.ok(test);
    }

    @PostMapping("/createTest/{testId}/question")
    public ResponseEntity<?> createQuestion(@PathVariable Long testId, @RequestBody CreateQuestion req) {
        Test test = testRepository.findById(testId).get();

        Question question = Question.builder()
                .questionText(req.getQuestionText())
                .test(test)
//                .answers(answers)
                .build();
        questionRepository.save(question);

        System.out.println(req);

        Set<Answer> answers = req.getAnswers().stream().map(answer -> Answer.builder()
                .answerText(answer.getAnswerText())
                .isCorrect(answer.isCorrect())
                .question(question)
                .build()).collect(Collectors.toSet());
        for (Answer answer : answers) {
            answerRepository.save(answer);
        }
        return ResponseEntity.ok(question);
    }

    @GetMapping("users/sorted")
    public ResponseEntity<?> sortedUsers(@RequestParam String param) {
        List<User> users = userService.getAllSorted(param);
        return ResponseEntity.ok(users);
    }


}
