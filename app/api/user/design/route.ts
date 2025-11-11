import openAi from 'openai';
import { AuthOptions } from '../../auth/[...nextauth]/authOptions';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';


const openAI =  new openAi({
    apiKey: process.env.OPENAI_API_KEY
})

export const POST = async (request: NextRequest) => {
    const session = await getServerSession(AuthOptions);
    if(!session || !session.user){
        return NextResponse.json("unauthorized access please login", {status: 403});
    }
    // TODO: CREATE POST 
    
}