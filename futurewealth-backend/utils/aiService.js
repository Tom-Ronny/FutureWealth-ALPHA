const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

exports.getAIRecommendation = async (profile, simulationResult) => {
  const prompt = `
Du er en erfaren finansiell rådgiver. Basert på denne brukerprofilen og simuleringen, gi en kortfattet og konkret anbefaling på norsk for optimal sparing frem til pensjonsalder:

Brukerprofil:
- Alder: ${profile.age}
- Inntekt: ${profile.income} kr
- Nåværende sparing: ${profile.savings} kr
- Pensjonsrettigheter: ${profile.pensionRights} kr
- Boligverdi: ${profile.homeValue} kr
- Boliglån: ${profile.mortgage} kr
- År til pensjon: ${simulationResult.yearsToRetirement}
- Forventet sparing ved pensjon: ${simulationResult.estimatedSavingsAtRetirement.toLocaleString()} kr

Svar kun med en konkret anbefalingstekst. Ingen innledning, ingen avslutning, ingen liste.
`;

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 300
    });

    return completion.data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Feil ved AI-anbefaling:', error);
    return 'Kunne ikke generere AI-anbefaling.';
  }
};
