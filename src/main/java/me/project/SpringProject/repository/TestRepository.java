package me.project.SpringProject.repository;

import me.project.SpringProject.entity.Test;
import me.project.SpringProject.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Set;

public interface TestRepository extends JpaRepository<Test, Long> {
    Set<Test> findAllById(Long id);
    List<Test> findAll();
//    Set<Test> findAllByUsersRequired(User user);
}
