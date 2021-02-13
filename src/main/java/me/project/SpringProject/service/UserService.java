package me.project.SpringProject.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import me.project.SpringProject.dto.UserDTO;
import me.project.SpringProject.dto.UserLightDTO;
import me.project.SpringProject.entity.*;
import me.project.SpringProject.exception.NoSuchUserException;
import me.project.SpringProject.jwt.JwtUtils;
import me.project.SpringProject.repository.RequiredTestRepository;
import me.project.SpringProject.repository.ResultRepository;
import me.project.SpringProject.repository.RoleRepository;
import me.project.SpringProject.repository.UserRepository;
import me.project.SpringProject.request.AddTestRequest;
import me.project.SpringProject.request.SignupRequest;
import me.project.SpringProject.request.UpdateUserRequest;
import me.project.SpringProject.response.MessageResponse;
import me.project.SpringProject.userDetails.UserDetailsAuth;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final TestService testService;
    private final RoleRepository roleRepository;
    private final RequiredTestService requiredTestService;

    @Autowired
    ResultRepository resultRepository;

    @Autowired
    RequiredTestRepository requiredTestRepository;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    PasswordEncoder passwordEncoder;

    public boolean checkIfExistsByEmail(String email) {
        boolean exists = userRepository.existsByEmail(email);
        if (exists) {
            log.info("{Email is already exists}");
        }
        return exists;
    }

    public Set<Test> getAllRequiredTests(Long id){
        User user = userRepository.findById(id).orElseThrow(NoSuchUserException::new);
        Set<RequiredTest> requiredTests = requiredTestRepository.findAllByUser(user);
        Set<Test> tests = new HashSet<>();
        requiredTests.forEach(testReq -> tests.add(testReq.getTest()));
        return tests;
    }

    public List<Test> getAvailableTests(Long id) {
        User user = userRepository.findById(id).orElseThrow(NoSuchUserException::new);
        List<Test> allTests = testService.getAll();
        Set<Test> passedTests = new HashSet<>();
        resultRepository.findAllByUser(user).forEach(res -> passedTests.add(res.getTest()));
        Set<Test> requiredTests = new HashSet<>();
        requiredTestRepository.findAllByUser(user).forEach(req -> requiredTests.add(req.getTest()));
        allTests.removeAll(requiredTests);
        allTests.removeAll(passedTests);
        return allTests;
    }

    public List<User> getAllUsersByRoles() {
        return userRepository.findAllByRoles(
                roleRepository.findByName(RoleType.ROLE_USER)
                        .orElseThrow(() -> new RuntimeException("Error: Role is not found.")));
    }

    public User getUser(Long id) {
        return userRepository.findById(id).orElseThrow(
                NoSuchUserException::new);
    }

    public UserDTO loginUser(String email, String password) {

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email, password));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtUtils.generateToken(authentication);

            UserDetailsAuth userDetails = (UserDetailsAuth) authentication.getPrincipal();

            List<String> roles = userDetails.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.toList());


            return UserDTO.builder()
                    .token(jwt)
                    .id(userDetails.getId())
                    .email(userDetails.getUsername())
                    .username(userDetails.getUsername())
                    .accountNonLocked(userDetails.isAccountNonLocked())
                    .roles(roles)
                    .build();

        } catch (Exception e) {
            log.info("Exception during login");
            throw new NoSuchUserException("Bad Credentials");
        }

    }

    public void registerUser(SignupRequest signupRequest) {
        if (checkIfExistsByEmail(signupRequest.getEmail())) {
            log.info("Error: Email is already registered!");
            throw new RuntimeException("Error: Email is already registered!");
        }

        User user = User.builder()
                .email(signupRequest.getEmail())
                .firstName(signupRequest.getFirstName())
                .lastName(signupRequest.getLastName())
                .password(passwordEncoder.encode(signupRequest.getPassword()))
                .created(new Timestamp(System.currentTimeMillis()))
                .build();

        Set<String> strRoles = signupRequest.getRole();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            Role userRole = roleRepository.findByName(RoleType.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        Role adminRole = roleRepository.findByName(RoleType.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(adminRole);
                        break;
                    default:
                        Role userRole = roleRepository.findByName(RoleType.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(userRole);
                }
            });
        }

        user.setRoles(roles);
        userRepository.save(user);
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

    public User updateUser(Long id, UpdateUserRequest req) {
        User oldUser = userRepository.findById(id).orElseThrow(NoSuchUserException::new);

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

    public Optional<RequiredTest> addTestsToUser(Long id, AddTestRequest req) {
        User user = userRepository.findById(id).get();
        Test test = testService.findById(req.getTestId()).get();
        return requiredTestService.addRequiredTest(user, test);
    }
}
