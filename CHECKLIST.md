# CHECKLIST.md
## ✅ FutureWealth ALPHA — Første gangs oppsett sjekkliste

---

### ✅ 1️⃣ Railway database

- [ ] Opprettet gratis konto på [https://railway.app/](https://railway.app/)
- [ ] Opprettet PostgreSQL database
- [ ] Hentet ut `.env` verdier fra "Connect" → Connection URL
- [ ] Lagt inn følgende verdier i backend Replit Secrets:

| Name | Value |
|------|-------|
| DB_NAME | fra Railway |
| DB_USER | fra Railway |
| DB_PASSWORD | fra Railway |
| DB_HOST | fra Railway |
| PORT | 5000 |
| OPENAI_API_KEY | sk-xxxxxx |
| JWT_SECRET | hemmeligstreng |

---

### ✅ 2️⃣ Backend (futurewealth-backend)

- [ ] Opprettet Node.js Repl → `futurewealth-backend`
- [ ] Lastet opp hele `futurewealth-backend/`
- [ ] Lagt inn miljøvariabler (Secrets)
- [ ] Klikket **Run** → backend kjører
- [ ] Notert public URL → `https://futurewealth-backend.username.repl.co/api`

---

### ✅ 3️⃣ Frontend (futurewealth-frontend)

- [ ] Opprettet Next.js Repl → `futurewealth-frontend`
- [ ] Lastet opp hele `futurewealth-frontend/`
- [ ] Lagt inn miljøvariabel:

| Name | Value |
|------|-------|
| NEXT_PUBLIC_API_BASE_URL | https://futurewealth-backend.username.repl.co/api |

- [ ] Klikket **Run** → frontend kjører
- [ ] Notert frontend URL → `https://futurewealth-frontend.username.repl.co`

---

### ✅ 4️⃣ Brukertest

- [ ] Åpnet frontend URL i browser
- [ ] Gått til `/auth` → registrert ny bruker
- [ ] Logget inn
- [ ] Lagret profil
- [ ] Kjørt simulering
- [ ] Verifisert at AI-anbefaling vises
- [ ] Sjekket historikk og lastet ned PDF-rapport

---

### ✅ 5️⃣ Ferdig daglig kjøring

- [ ] Lest [START_DAGLIG.md](START_DAGLIG.md)
- [ ] Testet daglig oppstart (Run backend → Run frontend)
- [ ] FutureWealth ALPHA klar for daglig bruk!

---

🎉 **Når alle punktene er krysset av — FutureWealth ALPHA er komplett satt opp og klar!** 🚀🚀🚀
