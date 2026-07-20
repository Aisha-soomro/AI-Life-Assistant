import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
  model: "gemini-flash-latest",
});

export async function askAI(prompt: string) {
  const result = await model.generateContent(prompt);
  return result.response.text();
}