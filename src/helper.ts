import { z, ZodRawShape } from "zod";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { JsonOutputFunctionsParser } from "langchain/output_parsers";
import { ChatMessage, HumanMessage } from "langchain/schema";
import { PromptTemplate } from "langchain/prompts";
//import { JsonOutputToolsParser } from "langchain/output_parsers";


//const host : string = process.env.REACT_APP_AI_HOST ? process.env.REACT_APP_AI_HOST : '';
const path : string = process.env.REACT_APP_AI_PATH ? process.env.REACT_APP_AI_PATH : '';
const key : string = process.env.REACT_APP_AI_APIKEY ? process.env.REACT_APP_AI_APIKEY : '';

const prompt = PromptTemplate.fromTemplate("You are a claims specialist capable of parcing the description of an accident. " +
"Find answers in this description of the accident: {description}");

// Instantiate the parser
const parser = new JsonOutputFunctionsParser();


// Define the function schema
const extractionFunctionSchema = {
  name: "claim_extractor",
  description: "Extracts fields from the input.",
  parameters: {
    type: "object",
    properties: {
      injuries: {
        type: "string",
        enum: ["positive", "negative"],
        description: "Was anyone injured?",
      },
      vehicle_num: {
        type: "number",
        description: "How many vehicles were involved?",
      },
      accident_type: {
        type: "string",
        enum: ["rear-ended", "hit while parked", "hit in an intersection", "hit while backing up", "in another type of accident"],
        description: "Type of accident",
      },
      damage_cause: {
        type: "string",
        description: "What caused the damage?",
      },
      accident_time: {
        type: "string",
        description: "When did the accident happen?",
      },
      accident_location: {
        type: "string",
        description: "Where did this happen?",
      },
    },
    required: ["tone", "word_count", "chat_response"],
  },
};

const schema: ZodRawShape = {
  name: z.string(),
  description: z.string(),
  parameters: z.object({
    injuries: z.enum(["yes", "no"]).describe("Was anyone injured?"),
    vehicle_num: z.string().describe("How many vehicles were involved?"),
    accident_type: z.enum([
      "rear-ended",
      "hit while parked",
      "hit in an intersection",
      "hit while backing up",
      "in another type of accident",
    ]).describe("Type of accident"),
    damage_cause: z.string().describe("What caused the damage?"),
    accident_time: z.string().describe("When did the accident happen?"),
    accident_location: z.string().describe("Where did this happen?"),
  }),
};

// Instantiate the ChatOpenAI class
const model = new ChatOpenAI({
  temperature: 0.2,
  azureOpenAIApiKey: key,
  azureOpenAIApiVersion: "2023-07-01-preview",
  azureOpenAIApiDeploymentName: "gpt-4",
  azureOpenAIBasePath: path,
});

// Create a new runnable, bind the function to the model, and pipe the output through the parser
const runnable = model
  .bind({
    functions: [extractionFunctionSchema],
    function_call: { name: "claim_extractor" }, 
  })
  .pipe(parser);

  export async function getAIResponse ( text: string): Promise<string> {

    if (!text) {
        return 'Text is required';
    }

    const formattedPrompt = await prompt.format({
      description: text,
    });
    const result = await runnable.invoke([
        new ChatMessage({ role: 'assistant', content: formattedPrompt }),
      ]);
    
    console.log({ result });
    return JSON.stringify(result);
  }
// Invoke the runnable with an input




/**
{
  result: {
    tone: 'positive',
    word_count: 4,
    chat_response: "Indeed, it's a lovely day!"
  }
}
 */