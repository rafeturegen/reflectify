import { useState } from "react";
import { Emotion } from "@/lib/types";

interface MoodBarProps {
    emotion: Emotion; // Define the type of the emotion prop
  }

export default function MoodBar({emotion}:MoodBarProps){

    const getEmotionColor = (emotion: Emotion) => {
        switch (emotion) {
            case 'Joy':
                return 'bg-yellow-400 text-yellow-400';
            case 'Sadness':
                return 'bg-blue-500 text-blue-500';
            case 'Anger':
                return 'bg-red-500 text-red-500';
            case 'Fear':
                return 'bg-purple-500 text-purple-500';
            case 'Disgust':
                return 'bg-green-500 text-green-500';
            case 'Calm':
                return 'bg-orange-300 text-orange-300'; 
            default:
                return 'bg-gray-300 text-gray-300';
        }
    }
    return(
        <section className="max-w-5xl mx-auto mt-4 md:mt-10">
            <div>
                <div className={"w-[320px] mx-auto h-6 border border-black rounded-2xl overflow-hidden " + getEmotionColor(emotion)}>
                    
                </div>
                <p className={"text-center py-1 text-lg !bg-inherit font-bold " + getEmotionColor(emotion)} >{emotion}</p>
            </div>      
        </section>
    )
}