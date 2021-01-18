package me.project.SpringProject.controller;

import me.project.SpringProject.entity.Difficulties;
import me.project.SpringProject.entity.Subjects;
import me.project.SpringProject.entity.Test;
import me.project.SpringProject.entity.User;
import me.project.SpringProject.repository.TestRepository;
import me.project.SpringProject.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.List;
import java.util.Set;

@CrossOrigin(origins = "*", allowedHeaders = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    TestRepository testRepository;

    @CrossOrigin(origins = "*", allowedHeaders = "*", maxAge = 3600)
    @GetMapping("/{id}/tests")
    public ResponseEntity<?> getAllRequiredTests(@PathVariable Long id) {
        User user = userRepository.findById(id).get();
        Set<Test> requiredTests = testRepository.findAllByUsers(user);
        return ResponseEntity.ok(requiredTests);
    }


}
