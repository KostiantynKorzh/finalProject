package me.project.SpringProject.controller;

import me.project.SpringProject.entity.Result;
import me.project.SpringProject.repository.ResultRepository;
import me.project.SpringProject.request.AddResultRequest;
import me.project.SpringProject.service.ResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", allowedHeaders = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/results")
public class ResultController {

    ResultRepository resultRepository;

    @Autowired
    ResultService resultService;

    @Autowired
    public ResultController(ResultRepository resultRepository) {
        this.resultRepository = resultRepository;
    }

    @PostMapping("/addResult")
    public ResponseEntity<?> postResult(@RequestBody AddResultRequest req) {
        System.out.println(req);
        return ResponseEntity.of(resultService.addResult(req.getUserId(),
                req.getUserId(),
                req.getScore()));
    }

}
