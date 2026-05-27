import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPEN_AI_KEY });

export async function generateSummaryFromOpenAi(pdfText: string) {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                { role: "system", content: "SUMMARY_SYSTEM_PROMPT" },
                { role: "user", content: "Hello, how are you?" }],
            temperature: 0.7,
            max_tokens: 1500,
        })
        console.log(completion.choices[0].message.content);
        return completion.choices[0].message.content;
    }
    catch (error: any) {
        if (error?.status === 429) {
            console.log("You are rate limited. Please try again later.");
        } else {
            console.log(error);
        }
    }
}