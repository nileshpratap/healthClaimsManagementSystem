CREATE TABLE Customers (
    UID CHAR(16) PRIMARY KEY,
    Name VARCHAR(60),
	Email VARCHAR(30) UNIQUE NOT NULL,
	Password VARCHAR(30),
    HealthCondition INTEGER CHECK (HealthCondition >= 0 AND HealthCondition <= 10),
    DOB DATE,
    PIDs VARCHAR(16)[] default '{}'
);

select * from Customers where UID = '1234';

CREATE TABLE Admins (
    EID CHAR(16) PRIMARY KEY,
	Email VARCHAR(30) UNIQUE NOT NULL,
	Password VARCHAR(30),
    Name VARCHAR(60),
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



