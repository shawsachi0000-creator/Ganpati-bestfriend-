exports.handler = async function (event) {
  try {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: JSON.stringify({
          success: false,
          error: "POST required"
        })
      };
    }

    const data = JSON.parse(event.body || "{}");

    const answer = data.answer || "No answer";
    const message = data.message || "No message";

    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = "8685932086";

    if (!BOT_TOKEN) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          success: false,
          error: "TELEGRAM_BOT_TOKEN is missing"
        })
      };
    }

    const text =
`❤️ Bestfriend ka Answer ❤️

📌 Answer: ${answer}

💬 Message:
${message}

🙏 Ganpati Bappa Morya!`;

    const response = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: text
        })
      }
    );

    const result = await response.json();

    if (!response.ok || !result.ok) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          success: false,
          error: result.description || "Telegram API error"
        })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true
      })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: error.message
      })
    };
  }
};
