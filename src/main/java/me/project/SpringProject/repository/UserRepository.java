package me.project.SpringProject.repository;

import me.project.SpringProject.entity.Role;
import me.project.SpringProject.entity.Test;
import me.project.SpringProject.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    Optional<User> findById(Long id);

    List<User> findAllByRoles(Role role);

    List<User> findAll();

    List<User> findAllByOrderByFirstName();

    List<User> findAllByOrderByLastName();

    List<User> findAllByOrderByEmail();

    boolean existsByEmail(String email);
}
