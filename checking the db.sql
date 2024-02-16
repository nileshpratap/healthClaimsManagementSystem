SELECT * FROM "public"."Customers";

SELECT * FROM "public"."Admins";

SELECT * FROM "public"."HEmps";

SELECT * FROM "public"."Policies";

UPDATE "public"."Policies" SET "PBalance" = 200000;

SELECT * FROM "public"."Claims";

DELETE FROM "public"."Customers" WHERE "UID" = '1111111111111111';

INSERT INTO "public"."Customers" ("UID", "Name", "Email", "Password", "HealthCondition", "DOB")
VALUES ('1111111111111111', 'Nilish', 'aba@gmail.com', 'nvp659', 9, '2000-03-25T00:00:00.000Z');

UPDATE "public"."Policies"
SET "EID" = '1234123412341234', "HEID" = '3234123412341234'
WHERE "UID" = '1111111111111111';

-- 1234123412341234 admin
-- 3234123412341234 heid
