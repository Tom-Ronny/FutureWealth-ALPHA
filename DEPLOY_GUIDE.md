# DEPLOY_GUIDE.md
## 🚀 FutureWealth — Deploy Guide

---

## 🎯 Mål

✅ Deploy backend til Railway  
✅ Deploy frontend til Vercel  
✅ 100 % skybasert PROD-oppsett

---

## 🟢 1️⃣ Backend — deploy til Railway

1️⃣ Opprett gratis konto → [https://railway.app/](https://railway.app/)  
2️⃣ Klikk **New Project** → velg **Deploy from GitHub repo**  
3️⃣ Koble til GitHub repo med FutureWealth-ALPHA  
4️⃣ Velg `futurewealth-backend` som prosjektmappe  
5️⃣ Railway bygger og deployer automatisk  
6️⃣ Legg inn ENV-variabler:

| Name | Value |
|------|-------|
| DB_NAME | fra Railway DB |
| DB_USER | fra Railway DB |
| DB_PASSWORD | fra Railway DB |
| DB_HOST | fra Railway DB |
| PORT | 5000 |
| OPENAI_API_KEY | sk-xxxxxx |
| JWT_SECRET | hemmeligstreng |

7️⃣ Railway gir deg public URL:  
`https://futurewealth-backend-production.up.railway.app/api`

---

## 🟢 2️⃣ Frontend — deploy til Vercel

1️⃣ Opprett gratis konto → [https://vercel.com/](https://vercel.com/)  
2️⃣ Importer GitHub repo → velg `futurewealth-frontend` som prosjektmappe  
3️⃣ Legg inn ENV-variabel:

| Name | Value |
|------|-------|
| NEXT_PUBLIC_API_BASE_URL | https://futurewealth-backend-production.up.railway.app/api |

4️⃣ Klikk **Deploy**  
5️⃣ Vercel gir deg public frontend URL:  
`https://futurewealth-frontend.vercel.app`

---

## 🟢 3️⃣ Daglig drift

- Backend Railway → auto-redeploy ved ny push  
- Frontend Vercel → auto-redeploy ved ny push  
- Ingen manuell deploy nødvendig!

---

## 🚀 Fordeler

✅ Prod-klar  
✅ Skalérbar  
✅ Global CDN  
✅ Profesjonell CI/CD pipeline

---

🎉 FutureWealth er nå klart for PROD deployment! 🚀
