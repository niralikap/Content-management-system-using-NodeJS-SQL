USE employees_db;

INSERT INTO department (department_name)
VALUES ("Sales"),
       ("Finance"),
       ("Marketing"),
       ("Human Resources"),
       ("Accounting");

INSERT INTO role (department_id, title, salary)
VALUES (1, "Sales Manager", 90000),
       (2, "Finance Analyst", 80000),
       (1, "Sales Specialist", 75000),
       (3, "Marketing Specialist", 90000),
       (5, "Accounting Manager", 90000),
       (1, "Sales Lead", 80000),
       (5, "Accountant", 70000),
       (4, "Head of HR", 90000);


INSERT INTO employee (role_id, first_name, last_name, manager_id)
VALUES (1, "Aditya", "Kapoor", NULL),
       (2, "Tisha", "Shah", NULL),
       (3, "Maddy", "Lanza", 1),
       (4, "Jasmine", "Wu", NULL),
       (5, "Jackie", "Shroff", NULL),
       (6, "Amber", "Carlson", 1),
       (7, "Anand", "Oberoi", 5),
       (8, "Craig", "Cooper", NULL);