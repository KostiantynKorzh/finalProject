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

@CrossOrigin(origins = "*", allowedHeaders = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    TestRepository testRepository;

//    @CrossOrigin(origins = "*", allowedHeaders = "*", maxAge = 3600)
//    @GetMapping("/{id}/tests")
//    public ResponseEntity<?> getAllRequiredTests(@PathVariable Long id) {
//        User user = userRepository.findById(id).get();
////       List<User> users = userRepository.findAllByRequiredTests(
////               testRepository.findAllById(id).get(0));
//        Test requiredTests = testRepository.findAllByUsers(user).get(0);
////        Test requiredTests = testRepository.findById(id).get();
////        requiredTests.setDifficulty(Difficulties.EASY);
////        requiredTests.setSubject(Subjects.MATH);
////        requiredTests.setCreated(new Timestamp(System.currentTimeMillis()));
////        System.out.println("required: " + requiredTests.size());
////        System.out.println("required: " + requiredTests);
////        System.out.println(id);
//        return ResponseEntity.ok(requiredTests);
//    }

}
