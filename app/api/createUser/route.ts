import connectMongo from "@/lib/connectMongo";
import ReflectifyJournal from "@/modal/journal";
import { NextResponse } from "next/server";

export async function POST(request:Request){
    try {
        const { email } = await request.json();
        await connectMongo();
        const existingUser = await ReflectifyJournal.findOne({ email });
        if(existingUser){
            return NextResponse.json({ message:"User already exists."}, {status:200})
        }
        const newUser = new ReflectifyJournal({
            email,
            journals:[]
        })
        await newUser.save();

        return NextResponse.json({ message: 'User created successfully.' }, { status: 201 });
    } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json({ error: 'Error creating user.' }, { status: 500 });
    }
}