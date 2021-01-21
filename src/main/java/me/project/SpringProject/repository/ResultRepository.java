package me.project.SpringProject.repository;

import me.project.SpringProject.entity.Result;
import me.project.SpringProject.entity.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface ResultRepository extends JpaRepository<Result, Long> {
    Set<Result> findAllByUser(User user);
}
