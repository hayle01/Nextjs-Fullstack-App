import openAi from 'openai';
import { AuthOptions } from '../../auth/[...nextauth]/authOptions';

const openAI =  new openAi({
    apiKey: process.env.OPENAI_API_KEY
})