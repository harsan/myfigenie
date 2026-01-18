import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const profile = await req.json();

    // Build prompt for OpenAI
    const prompt = `You are a financial advisor helping someone understand their financial situation.

Profile:
- Age: ${profile.age}
- Target retirement age: ${profile.targetRetirementAge}
- Annual income: $${Number(profile.income || 0).toLocaleString()}
- Cash/emergency savings: $${Number(profile.cashSavings || 0).toLocaleString()}
- Brokerage/stocks/ETFs: $${Number(profile.investments || 0).toLocaleString()}
- Retirement accounts (401k, IRA, etc.): $${Number(profile.retirementAccounts || 0).toLocaleString()}
${profile.kidsAges ? `- Kids' ages: ${profile.kidsAges}` : ""}

Provide personalized financial advice covering:
1. Retirement planning assessment
2. Investment allocation feedback
3. Emergency fund adequacy
4. Any specific recommendations based on their situation

Keep the advice clear, actionable, and educational.`;

    // Check if OPENAI_API_KEY is set
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: "OpenAI API key not configured" },
        { status: 500 }
      );
    }

    // Call OpenAI API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a helpful financial advisor providing educational guidance. Be clear, concise, and actionable.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("OpenAI API error:", errorData);
      return NextResponse.json(
        { error: "Failed to get AI advice" },
        { status: response.status }
      );
    }

    const data = await response.json();
    const advice = data.choices[0]?.message?.content || "No advice generated.";

    return NextResponse.json({ advice });
  } catch (error) {
    console.error("Error generating advice:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
