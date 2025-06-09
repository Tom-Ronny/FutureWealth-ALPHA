const taxCalculator = require('../utils/taxCalculator');
const aiService = require('../utils/aiService');
const SimulationHistory = require('../models/simulationHistoryModel');

exports.runSimulation = async (req, res) => {
  const { userId, age, income, savings, pensionRights, homeValue, mortgage, targetRetirementAge } = req.body;

  const yearsToRetirement = targetRetirementAge - age;
  const estimatedSavingsAtRetirement = savings + (income * 0.15 * yearsToRetirement);
  const estimatedTaxes = taxCalculator.calculateAnnualTax(income);

  const simulationResult = {
    yearsToRetirement,
    estimatedSavingsAtRetirement,
    estimatedTaxesPerYear: estimatedTaxes,
    successProbability: 0.85
  };

  const profile = { age, income, savings, pensionRights, homeValue, mortgage };

  const aiRecommendation = await aiService.getAIRecommendation(profile, simulationResult);

  try {
    await SimulationHistory.create({
      userId,
      age,
      income,
      savings,
      pensionRights,
      homeValue,
      mortgage,
      targetRetirementAge,
      yearsToRetirement,
      estimatedSavingsAtRetirement,
      estimatedTaxesPerYear: estimatedTaxes,
      successProbability: simulationResult.successProbability,
      aiRecommendation
    });

    console.log('Simulering lagret i historikk');
  } catch (error) {
    console.error('Feil ved lagring av historikk:', error);
  }

  res.status(200).json({
    ...simulationResult,
    aiRecommendation
  });
};

exports.getSimulationHistory = async (req, res) => {
  const userId = req.params.userId;

  try {
    const history = await SimulationHistory.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json(history);
  } catch (error) {
    console.error('Feil ved henting av historikk:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.downloadSimulationReport = async (req, res) => {
  const simulationId = req.params.simulationId;

  try {
    const simulation = await SimulationHistory.findByPk(simulationId);
    if (!simulation) {
      return res.status(404).json({ message: 'Simulering ikke funnet' });
    }

    const reportGenerator = require('../utils/reportGenerator');
    const filepath = await reportGenerator.generateSimulationReport(simulation, simulation.userId);

    res.download(filepath, (err) => {
      if (err) {
        console.error('Feil ved nedlasting:', err);
        res.status(500).json({ message: 'Feil ved nedlasting' });
      }
    });
  } catch (error) {
    console.error('Feil ved rapportgenerering:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
