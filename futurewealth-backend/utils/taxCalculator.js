exports.calculateAnnualTax = (income) => {
  // Forenklet skatteberegning (du kan utvide dette etter behov)
  let taxRate = 0.30;

  if (income < 300000) {
    taxRate = 0.20;
  } else if (income > 800000) {
    taxRate = 0.35;
  }

  return income * taxRate;
};
