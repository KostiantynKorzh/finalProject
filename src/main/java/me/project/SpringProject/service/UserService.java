package me.project.SpringProject.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import me.project.SpringProject.dto.UserDTO;
import me.project.SpringProject.dto.UserLightDTO;
import me.project.SpringProject.entity.RequiredTest;
import me.project.SpringProject.entity.RoleType;
import me.project.SpringProject.entity.Test;
import me.project.SpringProject.entity.User;
import me.project.SpringProject.exception.NoSuchUserException;
import me.project.SpringProject.jwt.JwtUtils;
import me.project.SpringProject.repository.RoleRepository;
import me.project.SpringProject.repository.UserRepository;
import me.project.SpringProject.request.AddTestRequest;
import me.project.SpringProject.request.UpdateUserRequest;
import me.project.SpringProject.userDetails.UserDetailsAuth;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
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
    AuthenticationManager authenticationManager;

    @Autowired
    JwtUtils jwtUtils;

    public boolean checkIfExistsByEmail(String email) {
        boolean exists = userRepository.existsByEmail(email);
        if (exists) {
            log.info("{Email is already exists}");
        }
        return exists;
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
