CREATE TABLE Customers (
    UID CHAR(16) PRIMARY KEY,
    Name VARCHAR(60),
	Email VARCHAR(30) UNIQUE NOT NULL,
	Password VARCHAR(30),
    HealthCondition INT,
    DOB DATE,
    PIDs VARCHAR(16)[] default '{}'
);

select * from Customers where UID = '1234';

CREATE TABLE Admins (
    EID CHAR(16) PRIMARY KEY,
    Name VARCHAR(60),
	Email VARCHAR(30) UNIQUE NOT NULL,
	Password VARCHAR(30),
    Policies CHAR(8)[]
);

CREATE TABLE HEmp (
    HEID CHAR(16) PRIMARY KEY,
	Email VARCHAR(30) UNIQUE NOT NULL,
	Password VARCHAR(30),
    Name VARCHAR(60),
    Policies VArCHAR(8)[],
    HID VARCHAR(6) DEFAULT '1'
);

CREATE TABLE Policies (
    PID CHAR(8) PRIMARY KEY,
    startdate DATE,
    enddate DATE CHECK (enddate >= (startdate + INTERVAL '1 year') AND enddate <= (startdate + INTERVAL '5 year')),
    pamount NUMERIC,
    UID CHAR(16),
    "Admin" CHAR(16),
    Claims CHAR(16)[],
    Status VARCHAR
);

CREATE TABLE Claims (
    CID CHAR(16) PRIMARY KEY,
    Customers CHAR(16),
    PolicyID CHAR(8) ,
    HEmpID CHAR(16),
	AdminID CHAR(16),
    Status VARCHAR,
    reqAmt NUMERIC
);


-- final schema

-- // This is your Prisma schema file,
-- // learn more about it in the docs: https://pris.ly/d/prisma-schema

-- // generator is essentilly where your code is generated into.
-- // consists bunch of code in prisma format
-- // so we are saying take all this prisma code and convert it using the prisma-client-js formatter which is default generator that we care about
-- // most of the project use this generator
-- generator client {
--   provider = "prisma-client-js"
-- }

-- // provider is where our data is coming from
-- datasource db {
--   provider = "postgresql"
--   url      = env("DATABASE_URL")
-- }

-- model Customers {
--   UID             String   @id @db.Char(16)
--   Name            String   @db.VarChar(60)
--   Email           String   @unique
--   Password        String   @db.VarChar(30)
--   HealthCondition Int
--   DOB             DateTime
--   PIDs            String[] @default([])
-- }

-- model Admins {
--   EID      String   @id @db.Char(16)
--   Name     String   @db.VarChar(60)
--   Email    String   @unique
--   Password String   @db.VarChar(30)
--   Policies String[] @default([])
-- }

-- model HEmps {
--   HEID     String   @id @db.Char(16)
--   HID      String   @default("1")
--   Name     String   @db.VarChar(60)
--   Email    String   @unique
--   Password String   @db.VarChar(30)
--   Policies String[] @default([])
-- }

-- model Policies {
--   PID       String   @id @db.Char(8)
--   StartDate DateTime
--   EndDate   DateTime
--   PAmount   Float
--   PBalance  Float
--   UID       String   @db.Char(16)
--   EID       String   @default("not assigned") @db.Char(16)
--   HEID      String   @default("not assigned") @db.Char(16)
--   Claims    String[] @default([])
--   Status    String   @default("Under Review")
-- }

-- model Claims {
--   CID        String @id @db.Char(16)
--   PID        String @db.Char(8)
--   CustomerID String @db.Char(16)
--   HEmpID     String @db.Char(16)
--   AdminID    String @db.Char(16)
--   Status     String @default("Under Review")
--   reqAmt     Float
-- }

-- // in other files, import prisma first then use its functions to manipulate the db
-- // import {PrismaClient} from '@prisma/client';
-- // const prisma = new PrismaClient()
-- // prisma.customers.findFirst

-- // prisma commands:
-- // npx prisma generate
-- // npx prisma migrate dev --name init



