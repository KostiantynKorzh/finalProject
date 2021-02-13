package me.project.SpringProject.service;

import lombok.extern.slf4j.Slf4j;
import me.project.SpringProject.controller.Translator;
import me.project.SpringProject.lang.HeaderLangResponse;
import me.project.SpringProject.dto.LangDTO;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class LangService {


    public LangDTO getContent() {
        return LangDTO.builder()
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
                .passedTests(Translator.toLocale("boardUser.passedTests"))
                .requiredTests(Translator.toLocale("boardUser.requiredTests"))
                .welcome(Translator.toLocale("welcome.welcome"))
                .welcomeChoosy(Translator.toLocale("welcome.welcomeChoosy"))
                .hi(Translator.toLocale("welcome.hi"))
                .or(Translator.toLocale("welcome.or"))
                .email(Translator.toLocale("login.email"))
                .enterEmail(Translator.toLocale("login.enterEmail"))
                .password(Translator.toLocale("login.password"))
                .enterPassword(Translator.toLocale("login.enterPassword"))
                .submit(Translator.toLocale("login.submit"))
                .firstName(Translator.toLocale("signup.firstName"))
                .lastName(Translator.toLocale("signup.lastName"))
                .build();
    }

}
