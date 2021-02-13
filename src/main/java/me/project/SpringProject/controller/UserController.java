package me.project.SpringProject.controller;

import lombok.extern.slf4j.Slf4j;
import me.project.SpringProject.dto.ResultDTO;
import me.project.SpringProject.dto.TakeTestDTO;
import me.project.SpringProject.entity.*;
import me.project.SpringProject.exception.NoSuchUserException;
import me.project.SpringProject.repository.*;
import me.project.SpringProject.request.AddTestRequest;
import me.project.SpringProject.response.MessageResponse;
import me.project.SpringProject.service.ResultService;
import me.project.SpringProject.service.TestService;
import me.project.SpringProject.service.UserService;
import me.project.SpringProject.userDetails.UserDetailsAuth;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    TestService testService;

    @Autowired
    ResultService resultService;


    @GetMapping("/{id}")
    public ResponseEntity<?> getUser(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(userService.getUser(id));
        } catch (NoSuchUserException e) {
            log.error(e.getMessage());
            return ResponseEntity.badRequest()
                    .body(new MessageResponse(e.getMessage()));
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> getHomeContent() {
        return ResponseEntity.ok("Home Content");
    }

    @GetMapping("/{id}/tests/passed")
    public ResponseEntity<?> getAllPassedTests(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(testService.getAllPassedTests(id));
        } catch (NoSuchUserException e) {
            log.error(e.getMessage());
            return ResponseEntity.badRequest()
                    .body(new MessageResponse(e.getMessage()));
        }
    }


    @GetMapping("/{id}/tests/available")
    public ResponseEntity<?> getAllAvailableTests(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(userService.getAvailableTests(id));
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.badRequest()
                    .body(new MessageResponse(e.getMessage()));
        }
    }

    @GetMapping("/{id}/tests/required")
    public ResponseEntity<?> getAllRequiredTests(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(userService.getAllRequiredTests(id));
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.badRequest()
                    .body(new MessageResponse(e.getMessage()));
        }
    }

    @PostMapping("/{id}/test")
    public ResponseEntity<?> passTest(@PathVariable Long id, @RequestBody AddTestRequest req) {
        try {
            resultService.passTest(id, req.getTestId());
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.badRequest()
                    .body(new MessageResponse(e.getMessage()));
        }
    }

    @GetMapping("/{id}/takeTest/{testId}")
    public ResponseEntity<?> getTest(@PathVariable Long testId) {
        try {
            return ResponseEntity.ok(testService.getTestWithQuestions(testId));
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.badRequest()
                    .body(new MessageResponse(e.getMessage()));
        }
    }

}
