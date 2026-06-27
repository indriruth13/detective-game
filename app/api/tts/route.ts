import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
  try {
    const { text, language, voice } = await req.json();

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }



    const finalApiKey = process.env.OPENAI_API_KEY;

    if (!finalApiKey || finalApiKey === "your-api-key-here" || finalApiKey.trim() === "") {
      return NextResponse.json(
        { error: "No OpenAI API key found in server environment." },
        { status: 401 }
      );
    }

    const openai = new OpenAI({ apiKey: finalApiKey });

    // Use the provided voice or fallback to onyx
    const selectedVoice = voice || "onyx";

    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: selectedVoice as "onyx" | "alloy" | "echo" | "fable" | "nova" | "shimmer",
      input: text,
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": buffer.length.toString(),
      },
    });
  } catch (error: any) {
    console.error("OpenAI TTS API error:", error);
    return NextResponse.json(
      { error: error?.message || "An error occurred while generating audio." },
      { status: 500 }
    );
  }
}
