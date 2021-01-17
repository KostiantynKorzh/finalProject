package me.project.SpringProject.controller;

import me.project.SpringProject.entity.Role;
import me.project.SpringProject.entity.RoleType;
import me.project.SpringProject.entity.User;
import me.project.SpringProject.repository.RoleRepository;
import me.project.SpringProject.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

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
        System.out.println("id = " + id);
        User user = userRepository.findById(id).get();
        System.out.println(user);
        userRepository.delete(user);
        return ResponseEntity.ok(user);
    }

}
