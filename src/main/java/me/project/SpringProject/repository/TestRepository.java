package me.project.SpringProject.repository;

import me.project.SpringProject.entity.Test;
import me.project.SpringProject.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TestRepository extends JpaRepository<Test, Long> {
    List<Test> findAllById(Long id);
    List<Test> findAllByUsers(User user);
}
