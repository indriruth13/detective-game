import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const language = formData.get("language") as string;

    if (!file) {
      return NextResponse.json({ error: "Audio file is required" }, { status: 400 });
    }

    const finalApiKey = process.env.OPENAI_API_KEY;

    if (!finalApiKey || finalApiKey === "your-api-key-here" || finalApiKey.trim() === "") {
      return NextResponse.json(
        { error: "No OpenAI API key found in server environment." },
        { status: 401 }
      );
    }

    const openai = new OpenAI({ apiKey: finalApiKey });

    // Ensure the file is an appropriate type and has a name
    const buffer = Buffer.from(await file.arrayBuffer());
    // Create a new file-like object that openai.audio.transcriptions expects
    const fileForOpenAI = new File([buffer], file.name || "audio.webm", {
      type: file.type || "audio/webm",
    });

    const transcription = await openai.audio.transcriptions.create({
      file: fileForOpenAI,
      model: "whisper-1",
      language: language === "id" ? "id" : "en",
    });

    return NextResponse.json({ text: transcription.text });
  } catch (error: any) {
    console.error("OpenAI Transcribe API error:", error);
    return NextResponse.json(
      { error: error?.message || "An error occurred while transcribing audio." },
      { status: 500 }
    );
  }
}
