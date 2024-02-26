// src/app/api/openai/route.ts

import { NextRequest, NextResponse } from 'next/server';
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    // Parse the request body to extract the 'query' property
    const body = await request.json();
    const { query } = body;

    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: "user", content: query }],
        model: "gpt-3.5-turbo",
    });

    // Respond with a JSON object containing the same value as the 'query'
    return NextResponse.json({ response: chatCompletion.choices[0].message.content });
  } catch (error) {
    // Handle any errors and return an appropriate response
    console.error('Error processing request:', error);
    return new NextResponse('Internal Server Error',{status:500});
  }
}
