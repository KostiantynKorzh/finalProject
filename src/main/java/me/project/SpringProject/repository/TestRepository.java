package me.project.SpringProject.repository;

import me.project.SpringProject.entity.Test;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Set;

public interface TestRepository extends JpaRepository<Test, Long> {
    Set<Test> findAllById(Long id);

    Page<Test> findAll(Pageable pageable);
}
