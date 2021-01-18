package me.project.SpringProject.controller;

import me.project.SpringProject.entity.Role;
import me.project.SpringProject.entity.RoleType;
import me.project.SpringProject.entity.Test;
import me.project.SpringProject.entity.User;
import me.project.SpringProject.repository.RoleRepository;
import me.project.SpringProject.repository.TestRepository;
import me.project.SpringProject.repository.UserRepository;
import me.project.SpringProject.request.AddTestRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@CrossOrigin(origins = "*", allowedHeaders = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    TestRepository testRepository;

    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getAllUsersByRoles() {
        List<User> users = userRepository.findAllByRoles(
                roleRepository.findByName(RoleType.ROLE_USER).get());
//        List<User> users = userRepository.findAll();
        return ResponseEntity.ok(users);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*", maxAge = 3600)
    @DeleteMapping("/users/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
//        System.out.println("id = " + id);
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
        List<Test> allTests = testRepository.findAll();
        Set<Test> nonRequiredTests = testRepository.findAllByUsers(user);
        allTests.removeAll(nonRequiredTests);
//        System.out.println(requiredTests);
        return ResponseEntity.ok(allTests);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*", maxAge = 3600)
    @PostMapping("/users/addTests/add/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> addTestsToUser(@PathVariable Long id, @RequestBody AddTestRequest req) {
//        System.out.println("req = " + testId);
        User user = userRepository.findById(id).get();
        Test test = testRepository.findById(req.getTestId()).get();
        test.getUsers().add(user);
        testRepository.save(test);
//        List<Test> requiredTests = testRepository.findAll();
//        List<Test> requiredTests = testRepository.findAll();
//        for (int i = 0; i < requiredTests.size(); i++) {
//            for (int j = 0; j < idsOfTests.length; j++) {
//                if(requiredTests.get(i).getId().equals(idsOfTests[j])){
//                    requiredTests.get(i).getUsers().add(user);
//                }
//            }
//        }
        return ResponseEntity.ok().build();
    }

}
