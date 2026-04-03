# Finance Backend 

##  Project Overview

This is a backend system for a finance dashboard that allows users to manage financial records based on roles. The system supports CRUD operations, role-based access control, and summary analytics using IBM Db2 cloud database.

---

##  Tech Stack

* Node.js
* Express.js
* IBM Db2 (Cloud Database)

---

##  Features

###  User Management

* Create users with roles:

  * Admin
  * Analyst
  * Viewer
* Role-based access control using middleware

---

###  Financial Records

* Add income and expense records
* View records
* Delete records
* Fields:

  * amount
  * type (income / expense)
  * category
  * date

---

###  Summary API

* Total Income
* Total Expense
* Net Balance

---

###  Access Control

| Action        | Admin | Analyst | Viewer |
| ------------- | ----- | ------- | ------ |
| Create Record | ✔     | ❌       | ❌      |
| View Records  | ✔     | ✔       | ✔      |
| Delete Record | ✔     | ❌       | ❌      |
| Summary       | ✔     | ✔       | ❌      |

---

##  API Endpoints

###  Create Record

POST /records
Headers:
role: admin

Body:

```json
{
  "amount": 5000,
  "type": "income",
  "category": "salary"
}
```

---

###  Get All Records

GET /records
Headers:
role: admin / analyst / viewer

---

### Get Single Record

GET /records/:id

---

### Delete Record

DELETE /records/:id
Headers:
role: admin

---

### Summary

GET /summary
Headers:
role: admin / analyst

---

##  Setup Instructions

### 1. Install dependencies

```
npm install
```

### 2. Run server

```
node server.js
```

---

##  Database

This project uses **IBM Db2 cloud database** for storing records.

---

##  Notes

* Role is passed via request headers
* Data is stored in IBM Db2 (cloud)
* Database credentials should be kept secure

---

##  Future Improvements

* JWT Authentication
* Pagination
* Search filters
* MVC architecture

---

## Conclusion

This project demonstrates backend development, API design, role-based access control, and cloud database integration using IBM Db2.

This project was developed as part of a learning assignment with self-implementation and guidance.
