const UserProfile = require('../models/userProfileModel');

exports.saveUserProfile = async (req, res) => {
  const { userId, age, income, savings, pensionRights, homeValue, mortgage } = req.body;

  try {
    const [profile, created] = await UserProfile.upsert({
      userId,
      age,
      income,
      savings,
      pensionRights,
      homeValue,
      mortgage
    });

    res.status(200).json({ message: 'User profile saved', profile });
  } catch (error) {
    console.error('Error saving profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getUserProfile = async (req, res) => {
  const userId = req.params.userId;

  try {
    const profile = await UserProfile.findByPk(userId);
    if (profile) {
      res.status(200).json(profile);
    } else {
      res.status(404).json({ message: 'User profile not found' });
    }
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
