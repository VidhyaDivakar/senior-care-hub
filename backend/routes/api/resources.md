---
{
  "username": "Mike",
  "email": "mike@example.com",
  "password": "password123"
}

---
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNmEyMDQ5YzI0MTBkM2Q3ZjUxZTIxNTk1In0sImlhdCI6MTc4MDUwMzA2OSwiZXhwIjoxNzgxMTA3ODY5fQ.q6qOJsxdzv7uo3bLC5rTCj2AEHHx7_WV6XnvNyR-l7g

---

http://localhost:3006/api/auth/register

{
  "username": "andrews",
  "email": "andrews@example.com",
  "password": "password123"
}

token - eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNmExZjBiZDFhNTc3MTcwMGU4YmNiY2FmIn0sImlhdCI6MTc4MDQxOTYxNCwiZXhwIjoxNzgwNDIzMjE0fQ.7AJMNtGX6Dn7hsv7H4A5MhPm861xtZ5d6qZ_--WRmIQ

http://localhost:3006/api/auth/me

{
  "_id": "6a1f0bd1a5771700e8bcbcaf",
  "username": "andrews",
  "email": "andrews@example.com",
  "createdAt": "2026-06-02T16:58:57.615Z",
  "updatedAt": "2026-06-02T16:58:57.615Z",
  "__v": 0
}

http://localhost:3006/api/auth/register

{
  "username": "mary",
  "email": "mary@example.com",
  "password": "password123"
}

http://localhost:3006/api/auth/login

{

"email": "mary@example.com",
  "password": "password123"
}

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNmExZjBhZjZhNTc3MTcwMGU4YmNiY2FlIn0sImlhdCI6MTc4MDQyMTQ5NiwiZXhwIjoxNzgwNDI1MDk2fQ.cprKDibehG7cijbvsFVPi6e-E3XpCsGoH11ZAHOXvpw

GET http://localhost:3006/api/auth/me

No body

{
  "_id": "6a1f0af6a5771700e8bcbcae",
  "username": "mary",
  "email": "mary@example.com",
  "createdAt": "2026-06-02T16:55:18.438Z",
  "updatedAt": "2026-06-02T16:55:18.438Z",
  "__v": 0
}

---
