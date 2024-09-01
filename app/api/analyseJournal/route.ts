import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const allowedEmotions = ['Anger', 'Calm', 'Joy', 'Sadness', 'Fear', 'Disgust', 'Neutral'] as const;
type Emotion = typeof allowedEmotions[number];

export async function POST(request: Request) {
  try {
    const { journalEntry }: { journalEntry: string } = await request.json();

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are an assistant that analyzes journal entries to determine the user's mood." },
        { role: "user", content: `Please analyze the following journal entry and determine the user's mood. Give the answer as one word and restrict your answers to Anger, Calm, Joy, Sadness, Fear, Disgust, or Neutral: "${journalEntry}".` },
      ],
      max_tokens: 10,
    });

    if (!response.choices[0]?.message?.content) {
      return NextResponse.json({ error: 'No analysis generated.' }, { status: 500 });
    }

    const moodAnalysis = response.choices[0].message.content.trim();
    const validatedEmotion: Emotion | undefined = allowedEmotions.find(emotion => moodAnalysis === emotion);

    if (!validatedEmotion) {
      return NextResponse.json({ error: 'Invalid emotion detected.' }, { status: 400 });
    }

    return NextResponse.json({ moodAnalysis: validatedEmotion });
  } catch (error) {
    console.error("Error analyzing journal entry:", error);
    return NextResponse.json({ error: 'Error analyzing journal entry' }, { status: 500 });
  }
}
