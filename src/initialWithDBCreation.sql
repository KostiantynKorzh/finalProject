create table roles
(
    id   bigint auto_increment
        primary key,
    name varchar(20) null
);

create table tests
(
    id         bigint auto_increment
        primary key,
    created    datetime     null,
    difficulty int          not null,
    duration   int          not null,
    subject    varchar(255) not null,
    title      varchar(255) null,
    constraint UK_m8r0mdwal61kks84anyptqq28
        unique (title)
);

create table questions
(
    id            bigint auto_increment
        primary key,
    question_text varchar(255) not null,
    test_id       bigint       null,
    constraint FKoc6xkgj16nhyyes4ath9dyxxw
        foreign key (test_id)
        references tests (id)
            on delete cascade
);

create table answers
(
    id          bigint auto_increment
        primary key,
    answer_text varchar(255) not null,
    is_correct  bit          not null,
    question_id bigint       null,
    constraint FK3erw1a3t0r78st8ty27x6v3g1
        foreign key (question_id) references questions (id)  on delete cascade
);

create table users
(
    id         bigint auto_increment
        primary key,
    created    datetime     null,
    email      varchar(20)  not null,
    first_name varchar(20)  not null,
    last_name  varchar(20)  not null,
    password   varchar(255) not null,
    constraint UK6dotkott2kjsp8vw4d0m25fb7
        unique (email)
);

create table required_tests
(
    id      bigint auto_increment
        primary key,
    test_id bigint null,
    user_id bigint null,
    constraint FKa2d5crry0vxss2gmrkhspbxdq
        foreign key (test_id) references tests (id)
            on delete cascade,
    constraint FKopf3csrsfeuw6l758v1qlefi9
        foreign key (user_id) references users (id)
            on delete cascade
);

create table results
(
    id             bigint auto_increment
        primary key,
    pass_timestamp datetime not null,
    score          double   not null,
    test_id        bigint   null,
    user_id        bigint   null,
    constraint FKxtl9ahma532if6r68yvgo7ck
        foreign key (user_id)
        references users (id)
        on update cascade
        on delete cascade,
        constraint FKe9uvk96os1lxpp8pf93p13lmv
        foreign key (test_id)
        references tests (id)
        on delete cascade
);

create table user_roles
(
    user_id bigint not null,
    role_id bigint not null,
    primary key (user_id, role_id),
    constraint FKh8ciramu9cc9q3qcqiv4ue8a6
        foreign key (role_id) references roles (id),
    constraint FKhfh9dx7w3ubf1co1vdev94g3f
        foreign key (user_id) references users (id)
            on delete cascade
);


INSERT INTO testing_app_db.roles (id, name)
VALUES (1, 'ROLE_USER');
INSERT INTO testing_app_db.roles (id, name)
VALUES (2, 'ROLE_MODERATOR');
INSERT INTO testing_app_db.roles (id, name)
VALUES (3, 'ROLE_ADMIN');

INSERT INTO testing_app_db.users (email, first_name, last_name, password, created)
VALUES ('allan@poe.com', 'Allan', 'Poe', 'password', NOW());
INSERT INTO testing_app_db.users (email, first_name, last_name, password, created)
VALUES ('george@orwell.com', 'George', 'Orwell', 'password', NOW());
INSERT INTO testing_app_db.users (email, first_name, last_name, password, created)
VALUES ('taras@shevchenko.com', 'Тарас', 'Шевченко', 'password', NOW());
INSERT INTO testing_app_db.users (email, first_name, last_name, password, created)
VALUES ('admin@admin.com', 'admin', 'admin', 'password', NOW());
INSERT INTO testing_app_db.users (email, first_name, last_name, password, created)
VALUES ('lina@kostenko.com', 'Ліна', 'Костенко', 'password', NOW());
INSERT INTO testing_app_db.users (email, first_name, last_name, password, created)
VALUES ('arthur@doyle.com', 'Arthur', 'Doyle', 'password', NOW());

INSERT INTO testing_app_db.user_roles (user_id, role_id)
VALUES (1, 1);
INSERT INTO testing_app_db.user_roles (user_id, role_id)
VALUES (2, 1);
INSERT INTO testing_app_db.user_roles (user_id, role_id)
VALUES (3, 1);
INSERT INTO testing_app_db.user_roles (user_id, role_id)
VALUES (4, 3);
INSERT INTO testing_app_db.user_roles (user_id, role_id)
VALUES (5, 1);
INSERT INTO testing_app_db.user_roles (user_id, role_id)
VALUES (6, 1);

INSERT INTO testing_app_db.tests (difficulty, subject, title, duration, created)
VALUES (2, 'MATH', 'Complex Math', 45, NOW());
INSERT INTO testing_app_db.tests (difficulty, subject, title, duration, created)
VALUES (1, 'MATH', 'High School Math', 30, NOW());
INSERT INTO testing_app_db.tests (difficulty, subject, title, duration, created)
VALUES (2, 'ENGLISH', 'Articles', 60, NOW());
INSERT INTO testing_app_db.tests (difficulty, subject, title, duration, created)
VALUES (0, 'MATH', 'Simple Math', 10, NOW());
INSERT INTO testing_app_db.tests (difficulty, subject, title, duration, created)
VALUES (0, 'ENGLISH', 'Numbers', 20, NOW());

INSERT INTO testing_app_db.required_tests (test_id, user_id)
VALUES (2, 1);
INSERT INTO testing_app_db.required_tests (test_id, user_id)
VALUES (1, 1);
INSERT INTO testing_app_db.required_tests (test_id, user_id)
VALUES (4, 1);
INSERT INTO testing_app_db.required_tests (test_id, user_id)
VALUES (1, 3);
INSERT INTO testing_app_db.required_tests (test_id, user_id)
VALUES (2, 2);
INSERT INTO testing_app_db.required_tests (test_id, user_id)
VALUES (3, 2);

INSERT INTO testing_app_db.questions(test_id, question_text)
VALUES (1, '3^3');
INSERT INTO testing_app_db.questions(test_id, question_text)
VALUES (1, '9/2');
INSERT INTO testing_app_db.questions(test_id, question_text)
VALUES (1, '1/4');
INSERT INTO testing_app_db.questions(test_id, question_text)
VALUES (1, 'sin(0)');

INSERT INTO testing_app_db.answers(question_id, answer_text, is_correct)
VALUES (1, '3', false);
INSERT INTO testing_app_db.answers(question_id, answer_text, is_correct)
VALUES (1, '6', false);
INSERT INTO testing_app_db.answers(question_id, answer_text, is_correct)
VALUES (1, '27', true);
INSERT INTO testing_app_db.answers(question_id, answer_text, is_correct)
VALUES (1, '9', false);
INSERT INTO testing_app_db.answers(question_id, answer_text, is_correct)
VALUES (2, '4.5', true);
INSERT INTO testing_app_db.answers(question_id, answer_text, is_correct)
VALUES (2, '4 1/2', true);
INSERT INTO testing_app_db.answers(question_id, answer_text, is_correct)
VALUES (2, '4', false);
INSERT INTO testing_app_db.answers(question_id, answer_text, is_correct)
VALUES (2, '11', false);
INSERT INTO testing_app_db.answers(question_id, answer_text, is_correct)
VALUES (3, '1', false);
INSERT INTO testing_app_db.answers(question_id, answer_text, is_correct)
VALUES (3, '4', false);
INSERT INTO testing_app_db.answers(question_id, answer_text, is_correct)
VALUES (3, '0.25', true);
INSERT INTO testing_app_db.answers(question_id, answer_text, is_correct)
VALUES (3, '0', false);
INSERT INTO testing_app_db.answers(question_id, answer_text, is_correct)
VALUES (4, '1', false);
INSERT INTO testing_app_db.answers(question_id, answer_text, is_correct)
VALUES (4, '0', true);
INSERT INTO testing_app_db.answers(question_id, answer_text, is_correct)
VALUES (4, '1/2', false);
INSERT INTO testing_app_db.answers(question_id, answer_text, is_correct)
VALUES (4, '-1/2', false);


INSERT INTO testing_app_db.questions(test_id, question_text)
VALUES (2, '5*3');
INSERT INTO testing_app_db.questions(test_id, question_text)
VALUES (2, '36*2');
INSERT INTO testing_app_db.questions(test_id, question_text)
VALUES (2, '84/2');
INSERT INTO testing_app_db.questions(test_id, question_text)
VALUES (2, '100*0');
INSERT INTO testing_app_db.questions(test_id, question_text)
VALUES (2, '(-2)*4');

INSERT INTO testing_app_db.answers(question_id, answer_text, is_correct)
VALUES (5, '15', true);
INSERT INTO testing_app_db.answers(question_id, answer_text, is_correct)
VALUES (5, '8', false);
INSERT INTO testing_app_db.answers(question_id, answer_text, is_correct)
VALUES (5, '-5', false);
INSERT INTO testing_app_db.answers(question_id, answer_text, is_correct)
VALUES (5, '12', false);
INSERT INTO testing_app_db.answers(question_id, answer_text, is_correct)
VALUES (6, '12', false);
INSERT INTO testing_app_db.answers(question_id, answer_text, is_correct)
VALUES (6, '24', false);
INSERT INTO testing_app_db.answers(question_id, answer_text, is_correct)
VALUES (6, '72', true);
INSERT INTO testing_app_db.answers(question_id, answer_text, is_correct)
VALUES (6, '168', false);
INSERT INTO testing_app_db.answers(question_id, answer_text, is_correct)
VALUES (7, '38', false);
INSERT INTO testing_app_db.answers(question_id, answer_text, is_correct)
VALUES (7, '54', false);
INSERT INTO testing_app_db.answers(question_id, answer_text, is_correct)
VALUES (7, '56', false);
INSERT INTO testing_app_db.answers(question_id, answer_text, is_correct)
VALUES (7, '42', true);
INSERT INTO testing_app_db.answers(question_id, answer_text, is_correct)
VALUES (8, '100', false);
INSERT INTO testing_app_db.answers(question_id, answer_text, is_correct)
VALUES (8, '0', true);
INSERT INTO testing_app_db.answers(question_id, answer_text, is_correct)
VALUES (8, '1000', false);
INSERT INTO testing_app_db.answers(question_id, answer_text, is_correct)
VALUES (9, '-8', true);
INSERT INTO testing_app_db.answers(question_id, answer_text, is_correct)
VALUES (9, '8', false);
INSERT INTO testing_app_db.answers(question_id, answer_text, is_correct)
VALUES (9, '2', false);
INSERT INTO testing_app_db.answers(question_id, answer_text, is_correct)
VALUES (9, '-6', false);


INSERT INTO testing_app_db.questions(test_id, question_text)
VALUES (3, '_ apple');
INSERT INTO testing_app_db.questions(test_id, question_text)
VALUES (3, '_ city');
INSERT INTO testing_app_db.questions(test_id, question_text)
VALUES (3, '_ West');

INSERT INTO testing_app_db.answers(question_id, answer_text, is_correct)
VALUES (10, 'a', false);
INSERT INTO testing_app_db.answers(question_id, answer_text, is_correct)
VALUES (10, 'an', true);
INSERT INTO testing_app_db.answers(question_id, answer_text, is_correct)
VALUES (10, 'the', true);
INSERT INTO testing_app_db.answers(question_id, answer_text, is_correct)
VALUES (11, 'a', true);
INSERT INTO testing_app_db.answers(question_id, answer_text, is_correct)
VALUES (11, 'an', false);
INSERT INTO testing_app_db.answers(question_id, answer_text, is_correct)
VALUES (11, 'the', true);
INSERT INTO testing_app_db.answers(question_id, answer_text, is_correct)
VALUES (12, 'an', false);
INSERT INTO testing_app_db.answers(question_id, answer_text, is_correct)
VALUES (12, 'a', false);
INSERT INTO testing_app_db.answers(question_id, answer_text, is_correct)
VALUES (12, 'the', true);


INSERT INTO testing_app_db.questions(test_id, question_text)
VALUES (4, '3+5');
INSERT INTO testing_app_db.questions(test_id, question_text)
VALUES (4, '10-5');
INSERT INTO testing_app_db.questions(test_id, question_text)
VALUES (4, '8+3');
INSERT INTO testing_app_db.questions(test_id, question_text)
VALUES (4, '1+2');
INSERT INTO testing_app_db.answers(question_id, answer_text, is_correct)
VALUES (13, '7', false);
INSERT INTO testing_app_db.answers(question_id, answer_text, is_correct)
VALUES (13, '8', true);
INSERT INTO testing_app_db.answers(question_id, answer_text, is_correct)
VALUES (13, '2', false);
INSERT INTO testing_app_db.answers(question_id, answer_text, is_correct)
VALUES (13, '15', false);
INSERT INTO testing_app_db.answers(question_id, answer_text, is_correct)
VALUES (14, '15', false);
INSERT INTO testing_app_db.answers(question_id, answer_text, is_correct)
VALUES (14, '50', false);
INSERT INTO testing_app_db.answers(question_id, answer_text, is_correct)
VALUES (14, '12', false);
INSERT INTO testing_app_db.answers(question_id, answer_text, is_correct)
VALUES (14, '5', true);
INSERT INTO testing_app_db.answers(question_id, answer_text, is_correct)
VALUES (15, '11', true);
INSERT INTO testing_app_db.answers(question_id, answer_text, is_correct)
VALUES (15, '10', false);
INSERT INTO testing_app_db.answers(question_id, answer_text, is_correct)
VALUES (15, '4', false);
INSERT INTO testing_app_db.answers(question_id, answer_text, is_correct)
VALUES (15, '21', false);
INSERT INTO testing_app_db.answers(question_id, answer_text, is_correct)
VALUES (16, '2', false);
INSERT INTO testing_app_db.answers(question_id, answer_text, is_correct)
VALUES (16, '3', true);
INSERT INTO testing_app_db.answers(question_id, answer_text, is_correct)
VALUES (16, '1', false);
INSERT INTO testing_app_db.answers(question_id, answer_text, is_correct)
VALUES (16, '12', false);


INSERT INTO testing_app_db.questions(test_id, question_text)
VALUES (5, '5');
INSERT INTO testing_app_db.questions(test_id, question_text)
VALUES (5, '10');
INSERT INTO testing_app_db.questions(test_id, question_text)
VALUES (5, '11');
INSERT INTO testing_app_db.questions(test_id, question_text)
VALUES (5, '12');
INSERT INTO testing_app_db.questions(test_id, question_text)
VALUES (5, '134');

INSERT INTO testing_app_db.answers(question_id, answer_text, is_correct)
VALUES (17, 'five', true);
INSERT INTO testing_app_db.answers(question_id, answer_text, is_correct)
VALUES (17, 'fife', false);
INSERT INTO testing_app_db.answers(question_id, answer_text, is_correct)
VALUES (17, 'fight', false);
INSERT INTO testing_app_db.answers(question_id, answer_text, is_correct)
VALUES (17, 'hive', false);
INSERT INTO testing_app_db.answers(question_id, answer_text, is_correct)
VALUES (18, 'tan', false);
INSERT INTO testing_app_db.answers(question_id, answer_text, is_correct)
VALUES (18, 'tane', false);
INSERT INTO testing_app_db.answers(question_id, answer_text, is_correct)
VALUES (18, 'ten', true);
INSERT INTO testing_app_db.answers(question_id, answer_text, is_correct)
VALUES (18, 'deux', false);
INSERT INTO testing_app_db.answers(question_id, answer_text, is_correct)
VALUES (19, 'oneteen', false);
INSERT INTO testing_app_db.answers(question_id, answer_text, is_correct)
VALUES (19, 'twelve', false);
INSERT INTO testing_app_db.answers(question_id, answer_text, is_correct)
VALUES (19, 'eleven', true);
INSERT INTO testing_app_db.answers(question_id, answer_text, is_correct)
VALUES (19, 'twelfe', false);
INSERT INTO testing_app_db.answers(question_id, answer_text, is_correct)
VALUES (20, 'twelve', true);
INSERT INTO testing_app_db.answers(question_id, answer_text, is_correct)
VALUES (20, 'dozen', true);
INSERT INTO testing_app_db.answers(question_id, answer_text, is_correct)
VALUES (20, 'twenty', false);
INSERT INTO testing_app_db.answers(question_id, answer_text, is_correct)
VALUES (20, 'twoteen', false);
INSERT INTO testing_app_db.answers(question_id, answer_text, is_correct)
VALUES (21, 'thirty-four', false);
INSERT INTO testing_app_db.answers(question_id, answer_text, is_correct)
VALUES (21, 'thirteenf', false);
INSERT INTO testing_app_db.answers(question_id, answer_text, is_correct)
VALUES (21, 'one thousand thirty-four', false);
INSERT INTO testing_app_db.answers(question_id, answer_text, is_correct)
VALUES (21, 'one hundred thirty-four', true);

