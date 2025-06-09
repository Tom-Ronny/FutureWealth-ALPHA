# RAILWAY_GUIDE.md
## Sette opp gratis PostgreSQL DB til FutureWealth

---

## 1️⃣ Opprett Railway konto

- Gå til [https://railway.app/](https://railway.app/)
- Klikk **Sign Up** (Google eller GitHub)

---

## 2️⃣ Opprett PostgreSQL DB

1️⃣ Klikk **New Project**  
2️⃣ Velg **Provision PostgreSQL**  
3️⃣ Railway oppretter ferdig DB

---

## 3️⃣ Hent miljøvariabler

1️⃣ Klikk på **Connect**  
2️⃣ Velg **Connection URL** → ser slik ut:


postgresql://user:password@host:5432/dbname





→ Eksempel oppdeling:

| Name | Value |
|------|-------|
| DB_NAME | dbname |
| DB_USER | user |
| DB_PASSWORD | password |
| DB_HOST | host (uten port) |

---

## 4️⃣ Bruk i Replit .env

Fyll inn disse i backend `.env` (via Secrets).

---

🎉 Ferdig — Railway DB klar til bruk!
