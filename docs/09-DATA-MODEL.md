# Data Model

## Purpose

This document describes the logical data model of the School Management System.

The application uses Azure SQL Database as its primary relational datastore.

---

## Entity Overview

## 1. Users
Represents application users and authentication identities.

### Key Fields
- Id
- Email
- PasswordHash
- FirstName
- LastName
- Role
- IsActive
- CreatedAt
- LastLoginAt

### Notes
A user may be linked to:
- one Student record, or
- one Teacher record.

---

## 2. Students
Represents student profiles.

### Key Fields
- Id
- UserId
- StudentNumber
- FirstName
- LastName
- DateOfBirth
- Gender
- Address
- PhoneNumber
- ClassroomId
- IsActive
- CreatedAt

---

## 3. Teachers
Represents teacher profiles.

### Key Fields
- Id
- UserId
- EmployeeNumber
- FirstName
- LastName
- Subject
- PhoneNumber
- IsActive
- CreatedAt

---

## 4. Classrooms
Represents school classes / sections.

### Key Fields
- Id
- Name
- Grade
- Section
- Capacity
- TeacherId
- IsActive
- CreatedAt

---

## 5. AttendanceSessions
Represents a class attendance event.

### Key Fields
- Id
- ClassroomId
- TeacherId
- Date
- Subject
- StartTime
- EndTime
- CreatedAt

---

## 6. AttendanceRecords
Represents a student’s status within an attendance session.

### Key Fields
- Id
- AttendanceSessionId
- StudentId
- Status
- Remarks
- CreatedAt

---

## 7. Grades
Represents academic scores.

### Key Fields
- Id
- StudentId
- Subject
- Term
- AcademicYear
- Score
- MaxScore
- Remarks
- CreatedAt

---

## 8. FeePayments
Represents fee/payment records.

### Key Fields
- Id
- StudentId
- FeeType
- Amount
- Status
- DueDate
- PaidDate
- PaymentMethod
- TransactionId
- CreatedAt

---

## 9. Announcements
Represents published notices.

### Key Fields
- Id
- Title
- Content
- Priority
- TargetAudience
- CreatedByUserId
- PublishDate
- ExpiryDate
- IsActive
- CreatedAt

---

## Relationship Summary

| Relationship | Type |
|-------------|------|
| User → Student | 1:1 |
| User → Teacher | 1:1 |
| Teacher → Classrooms | 1:N |
| Classroom → Students | 1:N |
| Classroom → AttendanceSessions | 1:N |
| Teacher → AttendanceSessions | 1:N |
| AttendanceSession → AttendanceRecords | 1:N |
| Student → AttendanceRecords | 1:N |
| Student → Grades | 1:N |
| Student → FeePayments | 1:N |

---

## Data Integrity Notes

- Unique constraint on `Users.Email`
- Unique constraint on `Students.StudentNumber`
- Unique constraint on `Teachers.EmployeeNumber`
- Delete behaviors are restricted to avoid SQL multiple cascade path issues

---

## Seed Data
The current demo seeds:
- one SuperAdmin user
- one Teacher user
- one Student user
- one Teacher record
- one Classroom record
- one Student record
- one Announcement record