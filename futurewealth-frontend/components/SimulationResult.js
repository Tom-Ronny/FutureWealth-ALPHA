export default function SimulationResult({ result }) {
  if (!result) return null;

  return (
    <div className="mt-6 p-4 border rounded bg-gray-100">
      <h2 className="text-xl font-bold mb-2">Resultat av simulering</h2>
      <p>År til pensjon: {result.yearsToRetirement}</p>
      <p>Forventet sparing ved pensjon: {result.estimatedSavingsAtRetirement.toLocaleString()} kr</p>
      <p>Årlig skatt: {result.estimatedTaxesPerYear.toLocaleString()} kr</p>
      <p>Suksess-sjanse: {(result.successProbability * 100).toFixed(1)}%</p>
      <div className="mt-4">
        <h3 className="font-semibold">AI-anbefaling:</h3>
        <p className="italic">{result.aiRecommendation}</p>
      </div>
    </div>
  );
}
