CREATE TABLE Works (
    WorkID INT NOT NULL AUTO_INCREMENT,
    Title VARCHAR(255),
    Subtitle VARCHAR(255),
    OriginalTitle VARCHAR(255),
    Description TEXT,
    PublishingYear INT,
    ImagePath VARCHAR(255),
    PRIMARY KEY(WorkID)
);

CREATE TABLE Author (
    AuthorID INT NOT NULL AUTO_INCREMENT,
    Name VARCHAR(100),
    LastName VARCHAR(100) NOT NULL,
    Description TEXT,
    ImagePath VARCHAR(255),
    PRIMARY KEY (AuthorID)
);

CREATE TABLE Role (
	RoleID INT NOT NULL AUTO_INCREMENT,
    RoleName VARCHAR(50),
    PRIMARY KEY(RoleID)
);

CREATE TABLE Works_Author (
    WorkID INT,
    AuthorID INT,
    RoleID INT,
    PRIMARY KEY(WorkID, AuthorID, RoleID),
    FOREIGN KEY(WorkID) REFERENCES Works(WorkID),
    FOREIGN KEY(AuthorID) REFERENCES Author(AuthorID),
    FOREIGN KEY(RoleID) REFERENCES Role(RoleID)
);

CREATE TABLE Edition (
    EditionID INT NOT NULL AUTO_INCREMENT,
    WorkID INT NOT NULL,
    Language VARCHAR(50),
    EditionYear INT,
    EditionNumber INT NOT NULL,
    PRIMARY KEY(EditionID),
    FOREIGN KEY(WorkID) REFERENCES Works(WorkID)
);

CREATE TABLE Publisher (
    PublisherID INT NOT NULL AUTO_INCREMENT,
    Name VARCHAR(255),
    Country VARCHAR(50),
    Logo VARCHAR(100),
    PRIMARY KEY (PublisherID)
);

CREATE TABLE Collection (
    CollectionID INT NOT NULL AUTO_INCREMENT,
    Name VARCHAR(100),
    PublisherID INT,
    PRIMARY KEY (CollectionID),
    FOREIGN KEY (PublisherID) REFERENCES Publisher(PublisherID)
);

CREATE TABLE Book (
    ISBN VARCHAR(30) NOT NULL,
    EditionID INT,
    CollectionID INT,
    TypeOfCover VARCHAR(75),
    Title VARCHAR(255),
    Subtitle VARCHAR(255),
    Description TEXT,
    Pages INT,
    Rating INT,
    Cover VARCHAR(255),
    PRIMARY KEY(ISBN),
    FOREIGN KEY (EditionID) REFERENCES Edition(EditionID),
    FOREIGN KEY (CollectionID) REFERENCES Collection(CollectionID)
);

CREATE TABLE Book_Author_Role (
    ISBN VARCHAR(30) NOT NULL,
    AuthorID INT NOT NULL,
    Role VARCHAR(50),
    PRIMARY KEY(ISBN, AuthorID, Role),
    FOREIGN KEY(ISBN) REFERENCES Book(ISBN),
    FOREIGN KEY(AuthorID) REFERENCES Author(AuthorID)
);

CREATE TABLE Genre (
	GenreID INT NOT NULL AUTO_INCREMENT,
    GenreName VARCHAR(35),
    PRIMARY KEY(GenreID)
);

CREATE TABLE Book_Genre(
    Book_GenreID INT NOT NULL AUTO_INCREMENT,
    ISBN VARCHAR(30) NOT NULL,
    GenreID INT NOT NULL,
    PRIMARY KEY(Book_GenreID),
    FOREIGN KEY (ISBN) REFERENCES book(ISBN),
    FOREIGN KEY (GenreID) REFERENCES genre(GenreID)
);

CREATE VIEW Collection_Publisher_View AS
SELECT
    p.Name AS PublisherName,
    p.Logo AS PublisherLogo,
    c.CollectionID,
    c.Name AS CollectionName
FROM
    collection c
JOIN
    publisher p ON c.PublisherID = p.PublisherID;

CREATE VIEW WorksAuthorView AS
SELECT
    WA.WorkID,
    WA.AuthorID,
    WA.RoleID,
    W.Title AS WorkTitle,
    W.Subtitle AS WorkSubtitle,
    W.OriginalTitle AS WorkOriginalTitle,
    W.PublishingYear AS WorkPublishingYear,
    W.Description AS WorkDescription,
    W.ImagePath AS WorkImagePath,
    A.Name AS AuthorName,
    A.LastName AS AuthorLastName,
    R.RoleName
FROM Works_Author WA
JOIN Works W ON WA.WorkID = W.WorkID
JOIN Author A ON WA.AuthorID = A.AuthorID
JOIN Role R ON WA.RoleID = R.RoleID;