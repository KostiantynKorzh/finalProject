package me.project.SpringProject.controller;

import me.project.SpringProject.lang.BoardUserResponse;
import me.project.SpringProject.service.LangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", allowedHeaders = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/lang")
public class LangController {

    private final LangService langService;

    @Autowired
    LangController(LangService langService) {
        this.langService = langService;
    }

    @GetMapping
    public ResponseEntity<?> getContent() {
        return ResponseEntity.ok(
                langService.getContent());
    }

}
