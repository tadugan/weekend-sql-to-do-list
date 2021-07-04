-- Queries to create and populate the todo task database

-- delete entire to_do_list table
DROP TABLE to_do_list;

-- create table to store to do list
CREATE TABLE to_do_list (
	"id" serial PRIMARY KEY,
	"name" varchar(80),
	"description" varchar(250),
	"complete" boolean default 'false',
	"date_completed" TIMESTAMP default null
);

-- populate to_do_list table with sample data
INSERT INTO to_do_list ("name", "description")
	VALUES ('Wash Dishes', 'Use soap and water'),
	('Mow the Lawn', 'Use the lawnmower'),
	('Cook Dinner', 'Menu tonight is pork chops and applesauce');
	
-- display entire table
SELECT *
FROM to_do_list;