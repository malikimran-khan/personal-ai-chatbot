const { ChatOpenAI } = require("@langchain/openai");
const { ConversationSummaryMemory } = require("langchain/memory");
const { ConversationChain } = require("langchain/chains");
require("dotenv").config();

const memory = new ConversationSummaryMemory({
  llm: new ChatOpenAI({ temperature: 0, openAIApiKey: process.env.OPENAI_API_KEY }),
});

const model = new ChatOpenAI({
  temperature: 0.7,
  openAIApiKey: process.env.OPENAI_API_KEY,
});

const chain = new ConversationChain({
  llm: model,
  memory,
});

exports.runChat = async (input) => {
  return await chain.call({ input });
};
