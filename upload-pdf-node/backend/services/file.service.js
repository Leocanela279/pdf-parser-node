const getClient = async () => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("Missing GEMINI_API_KEY");
  }

  const { GoogleGenAI } = await import("@google/genai");
  return new GoogleGenAI({ apiKey });
};

export const parseCV = async (text) => {
  const client = await getClient();
  const response = await client.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `
        Extract the candidate information and return JSON:

        {
        "name": "",
        "email": ""
        }

        CV TEXT:
        ${text}
        `,
    config: {
      responseMimeType: "application/json",
    },
  });

  if (!response.text) {
    throw new Error("Gemini returned an empty response");
  }

  return response.text;
};
