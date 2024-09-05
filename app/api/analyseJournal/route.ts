import connectMongo from '@/lib/connectMongo';
import ReflectifyJournal from '@/modal/journal';
import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const allowedEmotions = ['Anger', 'Calm', 'Joy', 'Sadness', 'Fear', 'Disgust', 'Neutral'] as const;
type Emotion = typeof allowedEmotions[number];

export async function POST(request: Request) {
  try {
    const { journalEntry, email }: { journalEntry: string, email:string } = await request.json();

    await connectMongo();
    const currentDate = new Date().toISOString().split("T")[0];
    console.log(currentDate)

    const iJournal = {
      content:journalEntry,
      date:currentDate
    }
    const updateResult = await ReflectifyJournal.findOneAndUpdate(
      { email },
      { $push: { journal: iJournal }},
      { new: true, upsert:true }
    )

    if (!updateResult) {
      return NextResponse.json({ error: 'User not found or failed to update journals.' }, { status: 404 });
    }

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
