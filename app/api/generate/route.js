import { NextResponse } from "next/server";
import OpenAI from 'openai';

const systemPrompt = `
You are a flashcard creator.
Instructions:

Topic Selection: Choose a specific topic, such as mathematics, history, science, or any other subject.
Flashcard Format: Each flashcard should include a question on one side and an answer on the other side.
Number of Flashcards: Create a minimum of five flashcards to ensure the topic is adequately covered.
Content Complexity: Adjust the complexity of the questions and answers according to the user’s knowledge level. For instance, for a beginner, start with basic concepts. For advanced learners, include more challenging material.
Review and Edit: After creating the flashcards, review them for accuracy and clarity. Make sure they are easy to understand and follow a logical sequence.
Only generate 10 flashcards 
Return in the following JSON format:

{
    "flashcards": [ 
        {
        "front": "str",
        "back": "str"
        }
    ]
}
`;

export async function POST(req) {
    const openai = new OpenAI({
        baseURL: "https://openrouter.ai/api/v1",
        apiKey: process.env.OPENROUTER_API_KEY,
        
    });


    const data = await req.text();

    const completion = await openai.chat.completions.create({
        model: "openai/gpt-3.5-turbo",
        messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: data },
        ],
        
        response_format: {type: 'json_object'},
    });
//      console.log(completion.choices[0].message.content);
    const flashcards = JSON.parse(completion.choices[0].message.content);
    
    return NextResponse.json(flashcards.flashcards);
}

// import { NextResponse } from "next/server";
// import OpenAI from "openai";
// // import Stripe from "stripe";

// const systemPrompt = `
// Objective: Create clear, concise, and effective flashcards to help users study and retain information efficiently.

// Guidelines:

// Clarity & Simplicity:

// Ensure each flashcard contains one concept or question per card.
// Use simple and clear language that is easy to understand.
// Avoid unnecessary jargon unless it is essential for understanding the topic.
// Question & Answer Format:

// Structure each flashcard with a direct question or prompt on the front side.
// Provide a clear and concise answer on the back side.
// Ensure that the answer is directly related to the question without requiring external context.
// Usefulness:

// Include only the most relevant information needed to understand or remember the concept.
// Avoid overwhelming the user with too much information on a single card.
// Engagement:

// Where appropriate, use examples, mnemonics, or analogies to make the information more memorable.
// Use visuals if they enhance understanding and retention.
// Customization:

// Allow users to edit and add to flashcards to suit their personal learning preferences.
// Provide space for users to add notes or additional context as needed.
// Review & Feedback:

// Ensure that the flashcards are accurate and have been reviewed for correctness.
// Allow users to provide feedback or suggestions for improvement.

// Only generates 10 flashcards

// Return in the following JSON format
// {
//     "flashcard":[
//         {
//             "front": str,
//             "back": str
//         }
//     ]
// }
// `
// export async function POST(req){
//     const openai = new OpenAI({
//         baseURL: "https://openrouter.ai/api/v1",
//         apiKey: process.env.OPENAI_API_KEY,
//     })
//     const data = await req.text()

//     const completion = await openai.chat.completions.create({
//         messages:[
//             {role: 'system', content: 'systemPrompt'},
//             {role: 'user', content: data},
//         ],
//         model: 'gpt-3.5-turbo',
//         response_format: {type: 'json_object'},
//     })
//     console.log(completion.choices[0].message.content)
//     const flashcard = JSON.parse(completion.choices[0].message.content)
//     return NextResponse.json(flashcards.flashcards)
// }
