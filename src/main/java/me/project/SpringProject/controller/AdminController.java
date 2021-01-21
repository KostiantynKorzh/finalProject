package me.project.SpringProject.controller;

import me.project.SpringProject.entity.*;
import me.project.SpringProject.repository.*;
import me.project.SpringProject.request.AddTestRequest;
import me.project.SpringProject.request.CreateQuestion;
import me.project.SpringProject.request.CreateTestRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

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
        User user = userRepository.findById(id).get();
        System.out.println(user);
        userRepository.delete(user);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/users/edit/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody User user) {

        System.out.println(id);
        System.out.println(user);

        User newUser = User.builder()
                .id(id)
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .password(user.getPassword())
                .created(user.getCreated())
                .roles(user.getRoles())
                .build();
        userRepository.save(newUser);
        return ResponseEntity.ok().build();
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*", maxAge = 3600)
    @GetMapping("/users/addTests/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getAllRequiredTests(@PathVariable Long id) {
        User user = userRepository.findById(id).get();
//        List<Test> allTests = testRepository.findAll();
//        Set<Result> passedTests = resultRepository.findAllByUser(user);
        Set<RequiredTest> requiredTests = requiredTestRepository.findAllByUser(user);
//        allTests.removeAll(nonRequiredTests);
//        allTests.removeAll(passedTests);
//        return ResponseEntity.ok(allTests);
        return ResponseEntity.ok(requiredTests);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*", maxAge = 3600)
    @PostMapping("/users/addTests/add/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> addTestsToUser(@PathVariable Long id, @RequestBody AddTestRequest req) {
        User user = userRepository.findById(id).get();
        Test test = testRepository.findById(req.getTestId()).get();
        RequiredTest requiredTestCheck = requiredTestRepository.findByUserAndTest(user, test)
                .orElse(RequiredTest.builder()
                        .test(test)
                        .user(user)
                        .build());
        requiredTestRepository.save(requiredTestCheck);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/createTest")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createTest(@RequestBody CreateTestRequest req) {
        Test test = Test.builder()
                .title(req.getTitle())
                .subject(Subjects.valueOf(req.getSubject()))
                .difficulty(Difficulties.valueOf(req.getDifficulty()))
                .created(new Date(System.currentTimeMillis()))
                .build();
        testRepository.save(test);
//        System.out.println(test);
        return ResponseEntity.ok(test);
    }

    @GetMapping("/testToFill/{testId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getTest(@PathVariable Long testId) {
        Test test = testRepository.findById(testId).get();
        return ResponseEntity.ok(test);
    }

    private Long testId;
    private String questionText;
    private List<Answer> answers;

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
//        answers.stream().map(answer -> answerRepository.save(answer));
//        System.out.println("answers = " + answers);
        for (Answer answer : answers) {
            answerRepository.save(answer);
        }
        return ResponseEntity.ok(question);
    }

}
