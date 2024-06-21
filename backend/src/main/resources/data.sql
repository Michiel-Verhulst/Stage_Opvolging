DELETE FROM ANSWERS;
DELETE FROM QUESTIONS;
DELETE FROM FORMS;
DELETE FROM FORM_TEMPLATES;
DELETE FROM INTERNSHIP_USER;
DELETE FROM INTERNSHIP;
DELETE FROM USERS;
DELETE FROM OPO;

INSERT INTO USERS (EMAIL, NAME, NUMMER, PASSWORD, ROLE, STUDY_CODE, BIRTH_DATE, NATIONALITY, SECOND_NUMBER) VALUES
    ('arno@ucll.be', 'Arno Robeys', 'r229800', 't', '3', null, '2003-03-28', 'BE', null),
    ('michiel@cegeka.be', 'Michiel Verhulst', 'r223800', 't', '2', null, '2003-06-17', 'BE', null),
    ('lennart@cegeka.be', 'Lennart Verbruggen', '0889426', 't', '2', null, '2000-04-16', 'BE', null),
    ('siebe@ucll.be', 'Siebe Sterckx', 'r225800', 't', '1', null, '2002-09-27', 'BE', null),
    ('joeri@ucll.be', 'Joeri Verscuren', 'r0889732', 't', '1', null, '2003-03-27', 'BE', null),
    ('neo@student.ucll.be', 'Neo Colebunders', 'r0886243', 't', '0', 'MH1', '2004-02-03', 'BE', 'q0886243'),
    ('alexander@student.ucll.be', 'Alexander Vanvinckenroye', 'r0932554', 't', '0', 'MH2', '2004-02-03', 'BE', 'q0932554'),
    ('nino@student.ucll.be', 'Nino Verstraeten', 'r0898606', 't', '0', null, '2003-03-10', 'BE', 'q0898606'),
    ('tom@student.ucll.be', 'Tom Nouwen', 'r0889572', 't', '0', null, '2003-03-10', 'BE', 'q0889572'),
    ('evert@student.ucll.be', 'Evert Van Rompaey', 'r0883572', 't', '0', null, '2003-03-10', 'BE', 'q0883572'),
    ('kevin@student.ucll.be', 'Kevin Verbruggen', 'r0894262', 't', '0', null, '2003-03-10', 'BE', 'q0894262');


INSERT INTO INTERNSHIP (ID, COMPANY_NAME, END_DATE, LOCATION, START_DATE, DESCRIPTION_SHORT, DESCRIPTION_LONG, DEPARTMENT, TASKS, LANGUAGE, CONTACTPERSON_CODE, ACTIVE, ACADEMY_YEAR) VALUES
    (1, 'Cegeka - Java Developer', '2024-05-12', 'Interleuvenlaan 16, Leuven', '2024-02-10', 'Short description Java Developer', 'Long description Java Developer', 'IT-Department', 'Cegeka task', 'English', 'Person1', false, 2022),
    (2, 'ACA - C# Developer', '2024-12-31', 'Diestsepoort 1, Leuven', '2024-05-02', 'Short description C# Developer', null, 'IT-Department', null, 'English', 'Person2', true, 2023),
    (3, 'Datawise - Server Beheer', '2024-07-24', 'Interleuvenlaan, Leuven', '2024-05-04',null, null, 'IT-Department', null, 'English/Dutch', 'Person3', true, 2024),
    (4, 'ACA - Functioneel Analyst', '2024-05-08', 'Diestsepoort 1, Leuven', '2024-04-18',null, null, 'IT-Department', null, 'English/Dutch', 'Person3', true, 2024),
    (5, 'Cegeka - Netwerk Beheer', '2024-06-17', 'Interleuvenlaan 16, Leuven', '2024-05-10',null, null, 'IT-Department', null, 'English/Dutch', 'Person3', true, 2024),
    (6, 'EASI - Data Consultant', '2024-07-12', 'Leuven, België', '2024-05-08',null, null, 'IT-Department', null, 'English/Dutch', 'Person3', true, 2024);

INSERT INTO INTERNSHIP_USER (INTERNSHIP_ID, USER_EMAIL) VALUES
    (1, 'kevin@student.ucll.be'), (1, 'siebe@ucll.be'), (1, 'michiel@cegeka.be'), (1, 'arno@ucll.be'),
    (2, 'neo@student.ucll.be'), (2, 'joeri@ucll.be'), (2, 'lennart@cegeka.be'), (2, 'arno@ucll.be'),
    (3, 'alexander@student.ucll.be'), (3, 'siebe@ucll.be'), (3, 'michiel@cegeka.be'), (3, 'arno@ucll.be'),
    (4, 'tom@student.ucll.be'), (4, 'siebe@ucll.be'), (4, 'lennart@cegeka.be'), (4, 'arno@ucll.be'),
    (5, 'evert@student.ucll.be'), (5, 'joeri@ucll.be'), (5, 'michiel@cegeka.be'), (5, 'arno@ucll.be'),
    (6, 'kevin@student.ucll.be'), (6, 'siebe@ucll.be'), (6, 'michiel@cegeka.be'), (6, 'arno@ucll.be');

INSERT INTO OPO (CODE, NAME, STUDY_CODE, LOOPS) VALUES
    ('MH1', 'Onderzoekstage', 'OO1234', 3),
    ('MH2', 'Stage', 'O02123', 2);

INSERT INTO FORM_TEMPLATES (ID, TITLE, TYPE, OPO_CODE, ACTIVE) VALUES
    (1, 'Zelfevaluatie Stage', '0', 'MH1', TRUE),
    (2, 'Zelfreflectie Stage', '1', 'MH2', TRUE),
    (3, 'Conclusie Stage', '2', 'MH1', TRUE);

INSERT INTO FORMS (ID, CURRENT_PHASE, INTERNSHIP_ID, TEMPLATE_ID, CREATION_DATE, UPDATE_DATE) VALUES
    (1, '0', 1, 1, '2021-01-01', '2021-01-01'),
    (2, '3', 1, 2, '2021-01-01', '2021-01-01'),
    (3, '5', 1, 3, '2021-01-01', '2021-01-01'),
    (6, '1', 3, 2, '2021-01-01', '2021-01-01'),
    (7, '2', 3, 3, '2021-01-01', '2021-01-01');

INSERT INTO QUESTIONS (ID, QUESTION, DESCRIPTION, TYPE, TEMPLATE_ID) VALUES
    (1, 'Wat zijn jouw taken geweest?', null, '2', 1),
    (2, 'Hoe vond je het over het algemeen gaan?', null, '1', 1),
    (4, 'Structuurkennis en kennismanagement', 'Belangrijke kennisbronnen en netwerken worden actief benut en uitgebreid', '1', 1),
    (6, 'Methodecompententie', 'Hij/zij gaat systematisch te werken en hanteert een gestructureerde methode van aanpak', '1', 1),
    (7, 'Vakkenkennis', 'De stagiare beschikt over voldoende theoretische kennis en kan deze in de praktijk toepassen', '1', 1),
    (3, 'Wat zijn dingen die je zoal geleerd hebt?', null, '0', 2),
    (5, 'Welke technieken heeft u mee gewerkt?', null, '2', 2),
    (8, 'Belangrijkste punt', 'Omschrijf het belangrijkste punt waar jij vindt dat je iets hebt bijgeleerd, leg uit.', '0', 3),
    (9, 'Beschrijf wat je meeneemt', null, '0', 3);
