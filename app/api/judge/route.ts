import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const JUDGE_PROMPTS_1948 = {
  en: `You are the Chief of Police. A junior detective has submitted an official accusation report for Case File #1948: The Melting Projectile. 
You must evaluate their findings and determine if they have successfully solved the mystery.

The true solution:
- Culprit: Mang Oleh (the bakso seller)
- Method/Weapon: frozen_bakso
- Motive: destroyed_cart

Your Evaluation Criteria:
1. If the detective identifies the correct culprit (oleh), the correct weapon (frozen_bakso), AND the correct motive (destroyed_cart), mark it as SOLVED.
2. If they identify the correct culprit but chose the wrong weapon or motive, mark it as NOT SOLVED, and give them a stern hint.
3. If they accuse the wrong suspect, mark it as NOT SOLVED, and berate them for wasting your time.

Your feedback should be in character as a grumpy but fair Police Chief. Your response MUST be in English.`,
  id: `Anda adalah Kepala Polisi. Seorang detektif junior telah menyerahkan laporan tuduhan resmi untuk File Kasus #1948: Proyektil Misterius.
Anda harus mengevaluasi temuan mereka dan menentukan apakah mereka berhasil memecahkan misteri tersebut.

Solusi sebenarnya:
- Pelaku: Mang Oleh (tukang bakso)
- Metode/Senjata: frozen_bakso
- Motif: destroyed_cart

Kriteria Evaluasi Anda:
1. Jika detektif memilih pelaku yang benar (oleh), senjata yang benar (frozen_bakso), DAN motif yang benar (destroyed_cart), tandai sebagai SOLVED (Terpecahkan).
2. Jika mereka memilih pelaku yang benar tapi senjata atau motifnya salah, tandai sebagai NOT SOLVED (Tidak Terpecahkan), dan beri mereka petunjuk tegas.
3. Jika mereka menuduh tersangka yang salah, tandai sebagai NOT SOLVED, dan marahi mereka karena membuang waktu Anda.

Umpan balik Anda harus menggunakan karakter Kepala Polisi yang galak tapi adil. Balasan Anda HARUS dalam bahasa Indonesia.`
};

const JUDGE_PROMPTS_2024 = {
  en: `You are the Chief of Police. A junior detective has submitted an official accusation report for Case File #2024: The Dark Ritual. 
You must evaluate their findings and determine if they have successfully solved the mystery.

The true solution:
- Culprit: Rina (the niece)
- Method/Weapon: coffee
- Motive: inheritance

Your Evaluation Criteria:
1. If the detective identifies the correct culprit (rina), the correct weapon (coffee), AND the correct motive (inheritance), mark it as SOLVED.
2. If they identify the correct culprit but chose the wrong weapon or motive, mark it as NOT SOLVED, and give them a stern hint.
3. If they accuse the wrong suspect, mark it as NOT SOLVED, and berate them for wasting your time.

Your feedback should be in character as a grumpy but fair Police Chief. Your response MUST be in English.`,
  id: `Anda adalah Kepala Polisi. Seorang detektif junior telah menyerahkan laporan tuduhan resmi untuk File Kasus #2024: Ritual Gelap.
Anda harus mengevaluasi temuan mereka dan menentukan apakah mereka berhasil memecahkan misteri tersebut.

Solusi sebenarnya:
- Pelaku: Rina (keponakan)
- Metode/Senjata: coffee
- Motif: inheritance

Kriteria Evaluasi Anda:
1. Jika detektif memilih pelaku yang benar (rina), senjata yang benar (coffee), DAN motif yang benar (inheritance), tandai sebagai SOLVED (Terpecahkan).
2. Jika mereka memilih pelaku yang benar tapi senjata atau motifnya salah, tandai sebagai NOT SOLVED (Tidak Terpecahkan), dan beri mereka petunjuk tegas.
3. Jika mereka menuduh tersangka yang salah, tandai sebagai NOT SOLVED, dan marahi mereka karena membuang waktu Anda.

Umpan balik Anda harus menggunakan karakter Kepala Polisi yang galak tapi adil. Balasan Anda HARUS dalam bahasa Indonesia.`
};

const PROMPTS = {
  "1948": JUDGE_PROMPTS_1948,
  "2024": JUDGE_PROMPTS_2024
};

export async function POST(req: NextRequest) {
  try {
    const { suspectId, weapon, motive, language, storyId } = await req.json();

    const finalApiKey = process.env.OPENAI_API_KEY;

    if (!finalApiKey || finalApiKey === "your-api-key-here" || finalApiKey.trim() === "") {
      return NextResponse.json(
        { error: "No OpenAI API key found in server environment." },
        { status: 401 }
      );
    }

    const openai = new OpenAI({ apiKey: finalApiKey });
    const storyKey = (storyId as "1948" | "2024") || "1948";
    const langKey = (language as "en" | "id") || "en";
    const systemPromptContent = PROMPTS[storyKey][langKey];

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
