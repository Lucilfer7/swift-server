CREATE DATABASE swift;
USE swift;

DROP TABLE author;
DROP TABLE role;
DROP TABLE publisher;
DROP TABLE collection;
DROP TABLE cover;
DROP TABLE genre;
DROP TABLE book;
drop table book_author_role;
drop table book_genre;

CREATE TABLE author (
	AuthorID INT NOT NULL AUTO_INCREMENT,
    Name VARCHAR(100),
    LastName VARCHAR(100) NOT NULL,
    Description TEXT,
    ImagePath VARCHAR(100),
    PRIMARY KEY (AuthorID)
);

CREATE TABLE role (
	roleID INT NOT NULL AUTO_INCREMENT,
    roleName VARCHAR(50) NOT NULL,
    PRIMARY KEY(roleID)
);

CREATE TABLE publisher (
	PublisherID INT NOT NULL AUTO_INCREMENT,
    Name VARCHAR (255),
    Country VARCHAR(50),
    PRIMARY KEY (PublisherID)
);

CREATE TABLE collection (
	CollectionID INT NOT NULL AUTO_INCREMENT,
    Name VARCHAR(100),
    PublisherID INT,
    PRIMARY KEY (CollectionID),
    FOREIGN KEY (PublisherID) REFERENCES Publisher(PublisherID)
);

CREATE TABLE cover (
	CoverID INT NOT NULL AUTO_INCREMENT,
    Type VARCHAR(200),
    Name VARCHAR(200),
	Data LONGBLOB,
    PRIMARY KEY(CoverID)
);

CREATE TABLE genre (
	GenreID INT NOT NULL AUTO_INCREMENT,
    Name VARCHAR(35),
    PRIMARY KEY(GenreID)
);

CREATE TABLE book (
    ISBN VARCHAR(30) NOT NULL,
    Title VARCHAR(255),
    Subtitle VARCHAR(255),
    Description TEXT,
    Price DECIMAL,
    Pages INT,
    Rating INT,
    PublishingYear INT,
    EditionYear INT,
    EditionNumber INT NOT NULL,
    CountryPrinted VARCHAR(30) NOT NULL,
    Language VARCHAR(50),
    TypeOfCover VARCHAR(75),
    CollectionID INT,
    PublisherID INT,
    CoverID INT,
    PRIMARY KEY(ISBN),
    FOREIGN KEY (CollectionID) REFERENCES collection(CollectionID),
    FOREIGN KEY (PublisherID) REFERENCES publisher(PublisherID),
    FOREIGN KEY (CoverID) REFERENCES cover(CoverID)
);

CREATE TABLE book_author_role (
    Book_Author_RoleID INT NOT NULL AUTO_INCREMENT,
    AuthorID INT,
    ISBN VARCHAR(30),
    RoleID INT,
    PRIMARY KEY(Book_Author_RoleID),
    FOREIGN KEY (AuthorID) REFERENCES author(AuthorID),
    FOREIGN KEY (ISBN) REFERENCES book(ISBN),
    FOREIGN KEY (RoleID) REFERENCES role(roleID)
);

CREATE TABLE book_genre(
    Book_GenreID INT NOT NULL AUTO_INCREMENT,
    ISBN VARCHAR(30) NOT NULL,
    GenreID INT NOT NULL,
    PRIMARY KEY(Book_GenreID),
    FOREIGN KEY (ISBN) REFERENCES book(ISBN),
    FOREIGN KEY (GenreID) REFERENCES genre(GenreID)
);

SELECT * FROM author;
SELECT * FROM role;
SELECT * FROM publisher;
SELECT * FROM collection;
SELECT * FROM cover;
SELECT * FROM genre;
SELECT * FROM book;
SELECT * FROM book_author_role;
SELECT * FROM book_genre;