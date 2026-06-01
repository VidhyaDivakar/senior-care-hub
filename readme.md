**### Project Name

SeniorCare Hub – Household Needs & Service Management Platform

### Project Description

A full-stack MERN application that helps senior households manage recurring monthly needs, service requests, and urgent assistance through a centralized dashboard. Users can track supplies, request transportation or home services, and maintain household requirements with secure authentication and personalized data management.

### Tech Stack

Frontend

* React
* React Router DOM
* Context API
* Axios
* CSS / Responsive Design

Backend

* Node.js
* Express.js

Database

* MongoDB
* Mongoose

Authentication & Security

* JWT Authentication
* bcrypt Password Hashing
* Authentication Middleware
* Ownership-Based Authorization

Tools

* Git
* GitHub
* Postman
* dotenv

---

### Proposed API Endpoints

#### Authentication

POST /api/users/register

POST /api/users/login

#### Monthly Needs

POST   /api/needs

GET    /api/needs

GET    /api/needs/:id

PUT    /api/needs/:id

DELETE /api/needs/:id

#### Service Requests

POST   /api/services

GET    /api/services

GET    /api/services/:id

PUT    /api/services/:id

DELETE /api/services/:id

#### Urgent Requests

POST   /api/urgent

GET    /api/urgent

GET    /api/urgent/:id

PUT    /api/urgent/:id

DELETE /api/urgent/:id

#### Supply Status Updates

POST /api/status

GET  /api/status

---

### React Pages

Login

Register

Dashboard

My Needs

Service Requests

Urgent Requests

Status Updates

Profile

---

### React Components

Navbar

ProtectedRoute

NeedCard

NeedForm

ServiceCard

ServiceForm

UrgentRequestCard

UrgentRequestForm

StatusUpdateForm

DashboardSummary

CategoryFilter

### Core Categories

Groceries

Bath Supplies

Medicines

Hospital Visits

Gardening Needs

Other Requests

This scope is large enough to demonstrate authentication, authorization, CRUD operations, MongoDB relationships, and React state management, while remaining realistic to complete as a portfolio MERN project.

**
