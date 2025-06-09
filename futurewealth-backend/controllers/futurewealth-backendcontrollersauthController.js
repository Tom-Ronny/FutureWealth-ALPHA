const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserAccount = require('../models/userAccountModel');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

exports.register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const user = await UserAccount.create({ email, passwordHash });

    res.status(201).json({ message: 'Bruker registrert', userId: user.id });
  } catch (error) {
    console.error('Feil ved registrering:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserAccount.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'Ugyldig bruker' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
      return res.status(401).json({ message: 'Feil passord' });
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '12h' });

    res.status(200).json({ token, userId: user.id });
  } catch (error) {
    console.error('Feil ved login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
