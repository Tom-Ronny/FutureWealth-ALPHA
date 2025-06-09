# API.md
## 🌐 FutureWealth — API Dokumentasjon (ALPHA)

---

## 🔐 Auth

### POST /api/auth/register

**Body:**

```json
{
  "email": "user@example.com",
  "password": "Password123"
}


POST /api/auth/login
Body:

json
Copy
Edit
{
  "email": "user@example.com",
  "password": "Password123"
}
Response:

json
Copy
Edit
{
  "token": "JWT_TOKEN",
  "userId": "USER_ID"
}
👤 User Profile
POST /api/user-profile/save
Headers: Authorization: Bearer JWT_TOKEN

Body:

json
Copy
Edit
{
  "userId": "USER_ID",
  "age": 35,
  "income": 600000,
  "savings": 200000,
  "pensionRights": 300000,
  "homeValue": 4000000,
  "mortgage": 2000000
}
GET /api/user-profile/get/:userId
Headers: Authorization: Bearer JWT_TOKEN

📊 Simulation
POST /api/simulation/run
Headers: Authorization: Bearer JWT_TOKEN

Body:

json
Copy
Edit
{
  "userId": "USER_ID",
  "age": 35,
  "income": 600000,
  "savings": 200000,
  "pensionRights": 300000,
  "homeValue": 4000000,
  "mortgage": 2000000,
  "targetRetirementAge": 67
}
GET /api/simulation/history/:userId
Headers: Authorization: Bearer JWT_TOKEN

GET /api/simulation/report/:simulationId
Headers: Authorization: Bearer JWT_TOKEN

Response: PDF download