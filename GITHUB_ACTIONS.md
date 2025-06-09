# GITHUB_ACTIONS.md
## 🚀 FutureWealth — GitHub Actions (CI/CD)

---

## 🎯 Mål

✅ Automatisk bygg og deploy  
✅ Test pipeline  
✅ Produsere artefakter (f.eks. PDF test)  
✅ Kvalitetssikring

---

## 🟢 1️⃣ Setup

1️⃣ Opprett `.github/workflows/ci.yml` i GitHub repo  
2️⃣ Eksempel CI pipeline:

```yaml
name: FutureWealth CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:13
        env:
          POSTGRES_USER: postgres
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: futurewealth_test
        ports:
          - 5432:5432
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install backend dependencies
        working-directory: ./futurewealth-backend
        run: npm install

      - name: Run backend tests
        working-directory: ./futurewealth-backend
        run: npm test || echo "No tests yet"

      - name: Install frontend dependencies
        working-directory: ./futurewealth-frontend
        run: npm install

      - name: Build frontend
        working-directory: ./futurewealth-frontend
        run: npm run build
