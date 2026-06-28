import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const SYSTEM_PROMPTS: Record<string, string> = {
  en: `You are the Chief of Police. A junior detective has submitted an official accusation report for Case File #1948: The Melting Projectile. 
You must evaluate their findings and determine if they have successfully solved the mystery.

The true solution:
- Culprit: Mang Oleh (the bakso seller)
- Method/Weapon: Frozen Bakso (launched using his cart's rubber straps / karet ban as a slingshot). The bakso melted in the morning sun, leaving no trace.
- Motive: Destroyed Livelihood (Pak Anton carelessly backed his SUV into Mang Oleh's cart the day before, destroying it and burning Oleh with boiling broth).

Your Evaluation Criteria:
1. If the detective identifies the correct culprit (Mang Oleh), the correct weapon (Frozen Bakso), AND the correct motive (Destroyed Cart), mark it as SOLVED. Their explanations might be brief free-text.
2. If they identify the correct culprit but chose the wrong weapon or motive, mark it as NOT SOLVED, and give them a stern hint.
3. If they accuse the wrong suspect, mark it as NOT SOLVED, and berate them for wasting your time.

Your feedback should be in character as a grumpy but fair Police Chief. Your response MUST be in English.`,
  id: `Anda adalah Kepala Polisi. Seorang detektif junior telah menyerahkan laporan tuduhan resmi untuk File Kasus #1948: Proyektil Misterius.
Anda harus mengevaluasi temuan mereka dan menentukan apakah mereka berhasil memecahkan misteri tersebut.

Solusi sebenarnya:
- Pelaku: Mang Oleh (tukang bakso)
- Metode/Senjata: Bakso Beku (ditembakkan menggunakan karet ban gerobaknya sebagai ketapel). Bakso itu lalu mencair di bawah sinar matahari, tidak meninggalkan jejak.
- Motif: Gerobak Hancur (Pak Anton menabrak gerobak Mang Oleh dengan mobilnya kemarin, menghancurkannya dan membuat Oleh tersiram kuah panas).

Kriteria Evaluasi Anda:
1. Jika detektif memilih pelaku yang benar (Mang Oleh), senjata yang benar (Bakso Beku), DAN motif yang benar (Gerobak Hancur), tandai sebagai SOLVED (Terpecahkan). Penjelasan mereka mungkin berupa teks bebas yang singkat.
2. Jika mereka memilih pelaku yang benar tapi senjata atau motifnya salah, tandai sebagai NOT SOLVED (Tidak Terpecahkan), dan beri mereka petunjuk tegas.
3. Jika mereka menuduh tersangka yang salah, tandai sebagai NOT SOLVED, dan marahi mereka karena membuang waktu Anda.

Umpan balik Anda harus menggunakan karakter Kepala Polisi yang galak tapi adil. Balasan Anda HARUS dalam bahasa Indonesia.`
};

export async function POST(req: NextRequest) {
  try {
    const { suspectId, weapon, motive, language } = await req.json();

    const finalApiKey = process.env.OPENAI_API_KEY;

    if (!finalApiKey || finalApiKey === "your-api-key-here" || finalApiKey.trim() === "") {
      return NextResponse.json(
        { error: "No OpenAI API key found in server environment." },
        { status: 401 }
      );
    }

    const openai = new OpenAI({ apiKey: finalApiKey });

    const systemPromptContent = SYSTEM_PROMPTS[language] || SYSTEM_PROMPTS.en;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPromptContent },
        { role: "user", content: `Accused Suspect ID: ${suspectId}\nWeapon/Method: ${weapon}\nMotive: ${motive}` }
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "verdict",
          strict: true,
          schema: {
            type: "object",
            properties: {
              solved: {
                type: "boolean",
                description: "True if the detective correctly solved the case based on the criteria."
              },
              feedback: {
                type: "string",
                description: "The Chief's feedback message."
              }
            },
            required: ["solved", "feedback"],
            additionalProperties: false
          }
        }
      }
    });

    const result = JSON.parse(completion.choices[0].message.content || "{}");

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("OpenAI API error:", error);
    return NextResponse.json(
      { error: error?.message || "An error occurred while communicating with OpenAI." },
      { status: 500 }
    );
  }
}
