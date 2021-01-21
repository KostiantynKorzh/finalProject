INSERT INTO testing_app_db.roles (id, name) VALUES (1, 'ROLE_USER');
INSERT INTO testing_app_db.roles (id, name) VALUES (2, 'ROLE_MODERATOR');
INSERT INTO testing_app_db.roles (id, name) VALUES (3, 'ROLE_ADMIN');

INSERT INTO testing_app_db.users (email, first_name, last_name, password) VALUES ('just@testing.com', 'fhgfgh', 'fghfgh', '$2a$10$5xOmg6K6ru1iW7UlgQOBMu/p8RUXFbqCc7rufrl8vfKCp9eheeMmC');
INSERT INTO testing_app_db.users (email, first_name, last_name, password) VALUES ('lol@lol.lol', 'newFirst', 'newLast', '$2a$10$ItfkPF79IXniRG8v51yCMuOKTpvo24Rq/gV7K4QinyyyEBcXZxRsm');
INSERT INTO testing_app_db.users (email, first_name, last_name, password) VALUES ('dfg@dgf.com', 'xzvdvsd', 'xcvxc', '$2a$10$xUaccl.T87iPlJo8npAo6eKZapkbMFwI3jr0VrWwbzT48ZSHYepqm');
INSERT INTO testing_app_db.users (email, first_name, last_name, password) VALUES ('admin@mail.com', 'admin', 'admin', '$2a$10$8n1K5H4A8i1yT8sx7tEyQeEmWmZ52FgWjxlKwrVoGlxGk2oP1LzPi');
INSERT INTO testing_app_db.users (email, first_name, last_name, password) VALUES ('new@user.com', 'to', 'show', '$2a$10$XfSJ1GZM5c0HjJ428XpNkeaAENZpf6SVpEJ22RiCXEjcyJb96lTGO');

INSERT INTO testing_app_db.user_roles (user_id, role_id) VALUES (1, 1);
INSERT INTO testing_app_db.user_roles (user_id, role_id) VALUES (2, 1);
INSERT INTO testing_app_db.user_roles (user_id, role_id) VALUES (3, 1);
INSERT INTO testing_app_db.user_roles (user_id, role_id) VALUES (5, 1);
INSERT INTO testing_app_db.user_roles (user_id, role_id) VALUES (4, 3);

INSERT INTO testing_app_db.tests (difficulty, subject, title)
VALUES ('HARD', 'MATH', 'First test');
INSERT INTO testing_app_db.tests (difficulty, subject, title)
VALUES ('MEDIUM', 'MATH', 'Second test');
INSERT INTO testing_app_db.tests (difficulty, subject, title)
VALUES ('HARD', 'ENGLISH', 'Third test');
INSERT INTO testing_app_db.tests (difficulty, subject, title)
VALUES ('EASY', 'MATH', 'Fourth test');
INSERT INTO testing_app_db.tests (difficulty, subject, title)
VALUES ('EASY', 'ENGLISH', 'Fifth test');

INSERT INTO testing_app_db.required_tests (test_id, user_id) VALUES (2, 1);
INSERT INTO testing_app_db.required_tests (test_id, user_id) VALUES (1, 1);
INSERT INTO testing_app_db.required_tests (test_id, user_id) VALUES (4, 1);
INSERT INTO testing_app_db.required_tests (test_id, user_id) VALUES (1, 3);
INSERT INTO testing_app_db.required_tests (test_id, user_id) VALUES (2, 2);
INSERT INTO testing_app_db.required_tests (test_id, user_id) VALUES (3, 2);

insert into questions(test_id, question_text) values(2, 'First Question for second test');
insert into questions(test_id, question_text) values(2, 'Second Question for second test');