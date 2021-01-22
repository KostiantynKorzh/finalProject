# insert into tests(title, subject, difficulty)
# values ("First test", "MATH", "HARD");
# insert into tests(title, subject, difficulty)
# values ("Second test", "MATH", "MEDIUM");
# insert into tests(title, subject, difficulty)
# values ("Third test", "ENGLISH", "HARD");
# insert into tests(title, subject, difficulty)
# values ("Fourth test", "MATH", "EASY");
# insert into tests(title, subject, difficulty)
# values ("Fifth test", "ENGLISH", "EASY");
# 3 5 11 12 / 5 6 7 8 9

# insert into user_required_tests(user_id, test_id) values(3, 7);
# insert into user_required_tests(user_id, test_id) values(3, 6);
# insert into user_required_tests(user_id, test_id) values(5, 5);
# insert into user_required_tests(user_id, test_id) values(11, 5);
# insert into user_required_tests(user_id, test_id) values(11, 6);
# insert into user_required_tests(user_id, test_id) values(11, 7);
# insert into user_required_tests(user_id, test_id) values(12, 8);

# delete from required_tests;
# delete from results;

insert into questions(test_id, question_text) values(1, 'First Question for first test');
insert into questions(test_id, question_text) values(1, 'Second Question for first test');
insert into questions(test_id, question_text) values(1, 'Third Question for first test');

# insert into required_tests(test_id, user_id)
# values (2, 1);

insert into answers(question_id, answer_text, is_correct)
values (1, 'First answer for first test', false);
insert into answers(question_id, answer_text, is_correct)
values (1, 'Second answer for first test (correct)', true);
insert into answers(question_id, answer_text, is_correct)
values (1, 'Third answer for first test', false);

insert into answers(question_id, answer_text, is_correct)
values (3, 'First answer for first question of second test', false);
insert into answers(question_id, answer_text, is_correct)
values (3, 'Second answer for first question (correct) of second test', true);
insert into answers(question_id, answer_text, is_correct)
values (3, 'Third answer for first question of second test', false);

insert into answers(question_id, answer_text, is_correct)
values (2, 'First answer for second test', false);
insert into answers(question_id, answer_text, is_correct)
values (2, 'Second answer for second test(correct)', true);

insert into answers(question_id, answer_text, is_correct)
values (2, 'First answer for third question', false);
insert into answers(question_id, answer_text, is_correct)
values (2, 'Second answer for third question(correct)', true);
insert into answers(question_id, answer_text, is_correct)
values (2, 'Third answer for third question', true);

# insert into results(test_id,user_id, score) values(1,1,)