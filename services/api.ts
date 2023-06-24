import { Configuration, OpenAIApi, CreateChatCompletionRequest } from "openai";
import initialData from "../data.json";

const openai = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_API_KEY }));

const generateSummaryAndTopics = async (topic: string, experience: string) => {
  const prompt = initialData.prompt.replace(/{topic}/g, topic).replace(/{experience}/g, experience);
  const GPT35TurboMessage: CreateChatCompletionRequest['messages'] = [
    { 
      role: "system", 
      content: `You are the wisest being in the world. You know all of the world's information and can generate succint summaries and sub-topics of a given topic, with the ability to tailor your answers to a wide range of levels of understanding.` },
    {
      role: "user",
      content: prompt,
    },
  ];

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: GPT35TurboMessage,
      max_tokens: 1000,
      temperature: 0,
    });

    // extract the response content
    console.log(response);
    const content = response.data.choices[0].message.content.trim();

    // parse the content to JSON
    const result = JSON.parse(content);

    return result;
  }
  catch (error) {
    throw error;
  }
}

export default generateSummaryAndTopics;