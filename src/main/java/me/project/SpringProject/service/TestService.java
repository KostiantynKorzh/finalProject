package me.project.SpringProject.service;

import lombok.extern.slf4j.Slf4j;
import me.project.SpringProject.dto.ResultDTO;
import me.project.SpringProject.dto.TakeTestDTO;
import me.project.SpringProject.entity.*;
import me.project.SpringProject.exception.NoSuchTestException;
import me.project.SpringProject.exception.NoSuchUserException;
import me.project.SpringProject.repository.QuestionRepository;
import me.project.SpringProject.repository.ResultRepository;
import me.project.SpringProject.repository.TestRepository;
import me.project.SpringProject.repository.UserRepository;
import me.project.SpringProject.request.CreateTestRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.sql.ResultSet;
import java.text.SimpleDateFormat;
import java.util.*;

@Slf4j
@Service
public class TestService {

    private final TestRepository testRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ResultRepository resultRepository;

    @Autowired
    QuestionRepository questionRepository;

    @Autowired
    TestService(TestRepository testRepository) {
        this.testRepository = testRepository;
    }

    public Optional<Test> findById(Long id) {
        return testRepository.findById(id);
    }

    public TakeTestDTO getTestWithQuestions(Long testId) {
        Test test = testRepository.findById(testId).orElseThrow(NoSuchTestException::new);
        Set<Question> questions = questionRepository.findAllByTest(test);
        return TakeTestDTO.builder()
                .test(test)
                .questions(questions)
                .build();
    }

    public Page<Test> getAllSorted(String param, Integer page) {
        Sort sort;
        if (param == null || param.isEmpty()) {
            sort = Sort.by("id");
        } else {
            sort = Sort.by(param);
        }
        Pageable paging = PageRequest.of(page, 2, sort);
        return testRepository.findAll(paging);
    }

    public Set<ResultDTO> getAllPassedTests(Long id) {
        User user = userRepository.findById(id).orElseThrow(
                NoSuchUserException::new);
        Set<Result> passedResults = resultRepository.findAllByUser(user);
        Set<ResultDTO> results = new HashSet<>();
        passedResults.forEach(result -> results.add(
                ResultDTO.builder()
                        .title(result.getTest().getTitle())
                        .subject(String.valueOf(result.getTest().getSubject()))
                        .difficulty(String.valueOf(result.getTest().getDifficulty()))
                        .score(result.getScore().intValue())
                        .passTimestamp(new SimpleDateFormat("MM/dd/yyyy HH:mm").format(result.getPassTimestamp()))
                        .build()));

        return results;
    }

    public Test createTest(CreateTestRequest req) {
        Test test = Test.builder()
                .title(req.getTitle())
                .subject(Subjects.valueOf(req.getSubject()))
                .difficulty(Difficulty.valueOf(req.getDifficulty()))
                .duration(req.getDuration())
                .created(new Date(System.currentTimeMillis()))
                .build();
        return testRepository.save(test);
    }

    public Test getTest(Long id){
        return testRepository.findById(id)
                .orElseThrow(NoSuchTestException::new);
    }

    public List<Test> getAll() {
        return testRepository.findAll();
    }

}
