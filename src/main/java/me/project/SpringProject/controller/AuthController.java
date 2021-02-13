package me.project.SpringProject.controller;

import me.project.SpringProject.entity.Role;
import me.project.SpringProject.entity.RoleType;
import me.project.SpringProject.entity.User;
import me.project.SpringProject.exception.NoSuchUserException;
import me.project.SpringProject.jwt.JwtUtils;
import me.project.SpringProject.repository.RoleRepository;
import me.project.SpringProject.repository.UserRepository;
import me.project.SpringProject.request.LoginRequest;
import me.project.SpringProject.request.SignupRequest;
import me.project.SpringProject.dto.UserDTO;
import me.project.SpringProject.response.MessageResponse;
import me.project.SpringProject.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

@CrossOrigin(origins = "*", allowedHeaders = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    @Autowired
    AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            UserDTO user = userService.loginUser(loginRequest.getEmail(), loginRequest.getPassword());
            return ResponseEntity.ok(user);
        } catch (NoSuchUserException e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse(e.getMessage()));
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody SignupRequest signupRequest) {
        try {
            userService.registerUser(signupRequest);
            return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse(e.getMessage()));
        }
    }


}
