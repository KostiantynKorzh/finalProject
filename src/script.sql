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

delete from required_tests where id=2;