const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./models/index');
const UserProfile = require('./models/userProfileModel');
const SimulationHistory = require('./models/simulationHistoryModel');
const UserAccount = require('./models/userAccountModel');

const userProfileRoutes = require('./routes/userProfile');
const simulationRoutes = require('./routes/simulation');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/user-profile', userProfileRoutes);
app.use('/api/simulation', simulationRoutes);
app.use('/api/auth', authRoutes);

// Sync DB and start server
sequelize.sync().then(async () => {
  console.log('Database synced (inkludert UserAccount, UserProfile, SimulationHistory)');
  await preloadTestUser();
  app.listen(PORT, () => {
    console.log(`FutureWealth Backend running on port ${PORT}`);
  });
});

// Preload test user
const bcrypt = require('bcryptjs');
async function preloadTestUser() {
  const existing = await UserAccount.findOne({ where: { email: 'test@futurewealth.no' } });
  if (!existing) {
    const passwordHash = await bcrypt.hash('Test1234', 10);
    await UserAccount.create({
      email: 'test@futurewealth.no',
      passwordHash
    });
    console.log('Testbruker opprettet: test@futurewealth.no / Test1234');
  } else {
    console.log('Testbruker finnes allerede');
  }
}
