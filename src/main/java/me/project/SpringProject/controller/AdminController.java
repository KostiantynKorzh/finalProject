package me.project.SpringProject.controller;

import lombok.extern.slf4j.Slf4j;
import me.project.SpringProject.entity.*;
import me.project.SpringProject.exception.NoSuchUserException;
import me.project.SpringProject.repository.*;
import me.project.SpringProject.request.AddTestRequest;
import me.project.SpringProject.request.CreateQuestion;
import me.project.SpringProject.request.CreateTestRequest;
import me.project.SpringProject.request.UpdateUserRequest;
import me.project.SpringProject.response.MessageResponse;
import me.project.SpringProject.service.QuestionService;
import me.project.SpringProject.service.TestService;
import me.project.SpringProject.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*", maxAge = 3600)
@RestController
@PreAuthorize("hasRole('ADMIN')")
@RequestMapping("/api/admin")
public class AdminController {


    @Autowired
    UserService userService;

    @Autowired
    TestService testService;

    @Autowired
    QuestionService questionService;

    @GetMapping("/users")
    public ResponseEntity<?> getAllUsersByRoles() {
        try {
            return ResponseEntity.ok(userService.getAllUsersByRoles());
        } catch (NoSuchUserException e) {
            log.error(e.getMessage());
            return ResponseEntity.badRequest()
                    .body(new MessageResponse(e.getMessage()));
        }
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*", maxAge = 3600)
    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        userService.delete(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/users/edit/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @Valid @RequestBody UpdateUserRequest req) {
        return ResponseEntity.ok(userService.updateUser(id, req));
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*", maxAge = 3600)
    @GetMapping("/users/addTests/{id}")
    public ResponseEntity<?> getAllRequiredTests(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(userService.getAllRequiredTests(id));
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.badRequest()
                    .body(new MessageResponse(e.getMessage()));
        }
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*", maxAge = 3600)
    @PostMapping("/users/addTests/add/{id}")
    public ResponseEntity<?> addTestsToUser(@PathVariable Long id, @RequestBody AddTestRequest req) {
        return ResponseEntity.ok(userService.addTestsToUser(id, req));
    }

    @PostMapping("/createTest")
    public ResponseEntity<?> createTest(@RequestBody CreateTestRequest req) {
        try {
            return ResponseEntity.ok(testService.createTest(req));
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.badRequest()
                    .body(new MessageResponse(e.getMessage()));
        }
    }

    @GetMapping("/testToFill/{testId}")
    public ResponseEntity<?> getTest(@PathVariable Long testId) {
        try {
            return ResponseEntity.ok(testService.getTest(testId));
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.badRequest()
                    .body(new MessageResponse(e.getMessage()));
        }
    }

    @PostMapping("/createTest/{testId}/question")
    public ResponseEntity<?> createQuestion(@PathVariable Long testId, @RequestBody CreateQuestion req) {
        try {
            return ResponseEntity.ok(questionService.createQuestion(testId, req));
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.badRequest()
                    .body(new MessageResponse(e.getMessage()));
        }
    }

    @GetMapping("users/sorted")
    public ResponseEntity<?> sortedUsers(@RequestParam(required = false) String param,
                                         @RequestParam(required = false) Integer page) {
        Page<User> users = userService.getAllSorted(param, page);
        return ResponseEntity.ok(users);
    }


}
