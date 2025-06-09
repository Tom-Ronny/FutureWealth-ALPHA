# INSTALL_REPLIT.md
## FutureWealth ALPHA — Kjøring 100 % i skyen (uten lokal installasjon)

---

## 1️⃣ Forutsetninger

- Har `futurewealth-backend/` og `futurewealth-frontend/` mapper lokalt
- Har **OpenAI API Key** → https://platform.openai.com/account/api-keys
- Har gratis konto på [https://replit.com/](https://replit.com/)
- Har gratis database (Railway eller Supabase anbefales)

---

## 2️⃣ Kjør backend i Replit

1️⃣ Gå til https://replit.com/ → **Create Repl** → velg **Node.js**  
2️⃣ Kall prosjektet `futurewealth-backend`  
3️⃣ Klikk **Upload folder** → last opp hele `futurewealth-backend/`  
4️⃣ Klikk **Secrets** → legg inn:

| Name | Value |
|------|-------|
| DB_NAME | fra Railway |
| DB_USER | fra Railway |
| DB_PASSWORD | fra Railway |
| DB_HOST | fra Railway |
| PORT | 5000 |
| OPENAI_API_KEY | sk-xxxxxx |
| JWT_SECRET | hemmeligstreng |

5️⃣ Klikk **Run** → backend kjører  
→ Backend URL: `https://futurewealth-backend.username.repl.co/api`

---

## 3️⃣ Kjør frontend i Replit

1️⃣ Gå til https://replit.com/ → **Create Repl** → velg **Next.js**  
2️⃣ Kall prosjektet `futurewealth-frontend`  
3️⃣ Klikk **Upload folder** → last opp hele `futurewealth-frontend/`  
4️⃣ Klikk **Secrets** → legg inn:

| Name | Value |
|------|-------|
| NEXT_PUBLIC_API_BASE_URL | https://futurewealth-backend.username.repl.co/api |

5️⃣ Klikk **Run** → frontend kjører  
→ Frontend URL: `https://futurewealth-frontend.username.repl.co`

---

## 4️⃣ Daglig oppstart

1️⃣ Åpne backend Repl → **Run**  
2️⃣ Åpne frontend Repl → **Run**  
3️⃣ Ferdig! FutureWealth ALPHA klar.

---

## 5️⃣ Anbefalt database

- Railway → [https://railway.app/](https://railway.app/)  
- Opprett PostgreSQL  
- Hent env-verdier fra "Connect" fanen.

---

🎉 **Gratulerer — du kjører FutureWealth 100 % skybasert — ingen installasjon!**
