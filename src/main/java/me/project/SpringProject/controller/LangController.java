package me.project.SpringProject.controller;

import me.project.SpringProject.langResponse.BoardUserResponse;
import me.project.SpringProject.langResponse.HeaderLangResponse;
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

    @GetMapping("/header")
    public ResponseEntity<?> getContentHeader() {
        return ResponseEntity.ok(
                langService.getHeaderContent()
        );
    }

    @GetMapping("/boardUser")
    public ResponseEntity<?> getContentBoardUser() {
        return ResponseEntity.ok(BoardUserResponse.builder()
                .passedTests(Translator.toLocale("boardUser.passedTests"))
                .requiredTests(Translator.toLocale("boardUser.requiredTests"))
                .pass(Translator.toLocale("boardUser.pass"))
                .take(Translator.toLocale("boardUser.take"))
                .build()
        );
    }

}
