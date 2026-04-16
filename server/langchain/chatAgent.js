const { ChatOpenAI } = require("@langchain/openai");
const { ChatPromptTemplate, MessagesPlaceholder } = require("@langchain/core/prompts");
const { HumanMessage, AIMessage, SystemMessage } = require("@langchain/core/messages");
require("dotenv").config();

const model = new ChatOpenAI({
  temperature: 0.7,
  openAIApiKey: process.env.OPENAI_API_KEY,
});

const prompt = ChatPromptTemplate.fromMessages([
  ["system", "You are a helpful, friendly personal AI assistant. You remember details about the user from the conversation history to provide a personalized experience. If the user tells you their name or preferences, keep them in mind."],
  new MessagesPlaceholder("history"),
  ["human", "{input}"],
]);

exports.runChat = async (input, history_data = []) => {
  // Convert DB history to LangChain message objects
  const history = history_data.map(msg => 
    msg.role === 'user' ? new HumanMessage(msg.content) : new AIMessage(msg.content)
  );

  const chain = prompt.pipe(model);
  const response = await chain.invoke({
    input: input,
    history: history,
  });

  return { response: response.content };
};
