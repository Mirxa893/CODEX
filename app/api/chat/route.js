export const runtime = 'edge';

export async function POST(req) {
  const { messages } = await req.json();
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://mkcodex.com",
      "X-Title": "MK Codex Chat"
    },
    body: JSON.stringify({
      model: "deepseek/deepseek-chat-v3-0324:free",
      messages: messages
    })
  });

  const data = await response.json();
  return new Response(JSON.stringify({ output: data.choices?.[0]?.message?.content || "No response" }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
}