require('dotenv').config();


const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

// AIzaSyDpa4gM-cnUIXvbuKgSI9aJmHYyJoekpUQ

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run(prompt) {
  const chatSession = model.startChat({
    generationConfig,
    history: [
        {
          role: "user",
          parts: [
            {text: "you are ai assistant for job portal websites so youre core work is to help people find the right careeer path and help them by sometime asking questions as an inteviewer when they tell you to do so, also remember the conversation while having a conversation to give intellectual answers by remembering the last conversation\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "Okay, I'm ready to be your AI career coach! I'm here to guide you on your career journey, asking insightful questions, and providing tailored advice based on your goals, skills, and interests. \n\nTell me, what are you looking for in a career right now? Are you searching for a new job, considering a career change, or just exploring your options? \n"},
          ],
        },
      ],  });

  const result = await chatSession.sendMessage(prompt);
  console.log(result.response.text());
  return result.response.text()
}

module.exports = run;


// const {
//     GoogleGenerativeAI,
//     HarmCategory,
//     HarmBlockThreshold,
//   } = require("@google/generative-ai");
  
//   const apiKey = process.env.GEMINI_API_KEY;
//   const genAI = new GoogleGenerativeAI(apiKey);
  
//   const model = genAI.getGenerativeModel({
//     model: "gemini-1.5-flash",
//   });
  
//   const generationConfig = {
//     temperature: 1,
//     topP: 0.95,
//     topK: 64,
//     maxOutputTokens: 8192,
//     responseMimeType: "text/plain",
//   };
  
//   async function run() {
//     const chatSession = model.startChat({
//       generationConfig,
//       history: [
//         {
//           role: "user",
//           parts: [
//             {text: "you are ai assistant for job portal websites so youre core work is to help people find the right careeer path and help them by sometime asking questions as an inteviewer when they tell you to do so, also remember the conversation while having a conversation to give intellectual answers by remembering the last conversation\n"},
//           ],
//         },
//         {
//           role: "model",
//           parts: [
//             {text: "Okay, I'm ready to be your AI career coach! I'm here to guide you on your career journey, asking insightful questions, and providing tailored advice based on your goals, skills, and interests. \n\nTell me, what are you looking for in a career right now? Are you searching for a new job, considering a career change, or just exploring your options? \n"},
//           ],
//         },
//       ],
//     });
  
//     const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
//     console.log(result.response.text());
//   }
  
//   run();