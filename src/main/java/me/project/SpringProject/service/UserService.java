package me.project.SpringProject.service;

import lombok.extern.slf4j.Slf4j;
import me.project.SpringProject.entity.RequiredTest;
import me.project.SpringProject.entity.Test;
import me.project.SpringProject.entity.User;
import me.project.SpringProject.repository.UserRepository;
import me.project.SpringProject.request.AddTestRequest;
import me.project.SpringProject.request.UpdateUserRequest;
import me.project.SpringProject.response.MessageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Autowired
    private TestService testService;

    @Autowired
    private RequiredTestService requiredTestService;

    public boolean checkIfExistsByEmail(String email) {
        boolean exists = userRepository.existsByEmail(email);
        if (exists) {
            log.info("{Email is already exists}");
        }
        return exists;
    }

    public void saveUser(User user) {
        try {
            userRepository.save(user);
        } catch (Exception ex) {
            log.info("{Email is already in use}");
        }
    }

    public List<User> getAllSorted(String param) {
        List<User> users;
        switch (param) {
            case "firstName":
                users = userRepository.findAllByOrderByFirstName();
                break;
            case "lastName":
                users = userRepository.findAllByOrderByLastName();
                break;
            case "email":
                users = userRepository.findAllByOrderByEmail();
                break;
            default:
                users = userRepository.findAll();
        }
        return users;
    }

    public void delete(Long id) {
        try {
            User user = userRepository.findById(id).get();
            userRepository.delete(user);
        } catch (Exception ex) {
            log.info("{Can't delete user}");
        }
    }

    public ResponseEntity<?> updateUser(Long id, UpdateUserRequest req) {
        User oldUser = userRepository.findById(id).get();

        User newUser = User.builder()
                .id(id)
                .firstName(req.getFirstName())
                .lastName(req.getLastName())
                .email(oldUser.getEmail())
                .password(oldUser.getPassword())
                .created(oldUser.getCreated())
                .roles(oldUser.getRoles())
                .build();
        userRepository.save(newUser);
        return ResponseEntity.ok(newUser);
    }

    public Optional<RequiredTest> addTestsToUser(Long id, AddTestRequest req) {
        User user = userRepository.findById(id).get();
        Test test = testService.findById(req.getTestId()).get();
        requiredTestService.addRequiredTest(user,test);
        return requiredTestService.addRequiredTest(user,test);
    }
}
