package me.project.SpringProject.controller;

import me.project.SpringProject.langResponse.BoardUserResponse;
import me.project.SpringProject.langResponse.HeaderLangResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", allowedHeaders = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/lang")
public class LangController {

    @GetMapping("/header")
    public ResponseEntity<?> getContentHeader() {
        return ResponseEntity.ok(HeaderLangResponse.builder()
                .home(Translator.toLocale("header.home"))
                .users(Translator.toLocale("header.users"))
                .tests(Translator.toLocale("header.tests"))
                .users(Translator.toLocale("header.users"))
                .allTests(Translator.toLocale("header.allTests"))
                .createTest(Translator.toLocale("header.createTest"))
                .user(Translator.toLocale("header.user"))
                .logout(Translator.toLocale("header.logout"))
                .lang(Translator.toLocale("header.lang"))
                .login(Translator.toLocale("header.login"))
                .signup(Translator.toLocale("header.signup"))
                .profile(Translator.toLocale("header.profile"))
                .passedTests(Translator.toLocale("user.passedTests"))
                .requiredTests(Translator.toLocale("user.requiredTests"))
                .build()
        );
    }

    @GetMapping("/boardUser")
    public ResponseEntity<?> getContentBoardUser() {
        return ResponseEntity.ok(BoardUserResponse.builder()
                .passedTests(Translator.toLocale("user.passedTests"))
                .requiredTests(Translator.toLocale("user.requiredTests"))
                .pass(Translator.toLocale("user.pass"))
                .take(Translator.toLocale("user.take"))
                .build()
        );
    }

}
