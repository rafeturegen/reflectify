import connectMongo from "@/lib/connectMongo"
import ReflectifyJournal from "@/modal/journal";
import { NextResponse } from "next/server";

export async function POST(request:Request){
    try {
        await connectMongo();
        const { email, dateComing } : { email:string, dateComing:string } = await request.json();
        const convertedDate = dateComing.split("T")[0]

        const user = await ReflectifyJournal.findOne({ email }); 
        if(!user){
            return NextResponse.json({ error:"No user with this email!", status:404 });
        }
        const journalEntry = user.journal.find((journal: { date: Date }) => {
            const journalDate = new Date(journal.date).toISOString().split("T")[0];
            console.log("journal:", journalDate, "date:", convertedDate)
            return journalDate === convertedDate;
        });
        const journalContent = journalEntry ? journalEntry.content : '';

        return NextResponse.json({ journal:journalContent, status:200 })

    } catch (error) {
        console.error("Error fetching user's journal entry:", error);
        return NextResponse.json({ error: "Error fetching journal entry.", status: 500 });
    }
}