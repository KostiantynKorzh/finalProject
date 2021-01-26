package me.project.SpringProject.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import me.project.SpringProject.entity.RequiredTest;
import me.project.SpringProject.entity.RoleType;
import me.project.SpringProject.entity.Test;
import me.project.SpringProject.entity.User;
import me.project.SpringProject.repository.RoleRepository;
import me.project.SpringProject.repository.UserRepository;
import me.project.SpringProject.request.AddTestRequest;
import me.project.SpringProject.request.UpdateUserRequest;
import me.project.SpringProject.response.MessageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor

public class UserService {
    private final UserRepository userRepository;
    private final TestService testService;
    private final RoleRepository roleRepository;
    private final RequiredTestService requiredTestService;

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

    public Page<User> getAllSorted(String param, Integer page) {
        Page<User> users;
        Sort sort;
        if (param == null || param.isEmpty()) {
            sort = Sort.unsorted();
        } else {
            sort = Sort.by(param);
        }
        Pageable paging = PageRequest.of(page, 2, sort);
        users = userRepository.findAllByRoles(roleRepository.findByName(RoleType.ROLE_USER).get(), paging);
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

    // orElse ----!!!----
    public User updateUser(Long id, UpdateUserRequest req) {
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
        return userRepository.save(newUser);
    }

    // NO!
    public Optional<RequiredTest> addTestsToUser(Long id, AddTestRequest req) {
        User user = userRepository.findById(id).get();
        Test test = testService.findById(req.getTestId()).get();
        return requiredTestService.addRequiredTest(user, test);
    }
}
