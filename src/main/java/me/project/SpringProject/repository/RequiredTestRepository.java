package me.project.SpringProject.repository;

import me.project.SpringProject.entity.RequiredTest;
import me.project.SpringProject.entity.Test;
import me.project.SpringProject.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.Set;

public interface RequiredTestRepository extends JpaRepository<RequiredTest, Long> {
    Set<RequiredTest> findAllByUser(User user);

    Optional<RequiredTest> findById(Long id);

    Optional<RequiredTest> findByUserAndTest(User user, Test test);
}
