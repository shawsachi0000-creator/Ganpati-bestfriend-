exports.handler = async function(event) {
    try {
        if (event.httpMethod !== "POST") {
            return {
                statusCode: 405,
                body: JSON.stringify({
                    success: false,
                    error: "Method not allowed"
                })
            };
        }

        const data = JSON.parse(event.body || "{}");

        const answer = data.answer || "No answer";
        const message = data.message || "No message";

        const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

        // Tumhara Telegram Chat ID
        const CHAT_ID = "8685932086";

        if (!BOT_TOKEN) {
            return {
                statusCode: 500,
                body: JSON.stringify({
                    success: false,
                    error: "Telegram bot token is not configured"
                })
            };
        }

        const text =
`❤️ Bestfriend ka Answer ❤️

📌 Answer: ${answer}

💬 Message:
${message}

🙏 Ganpati Bappa Morya!`;

        const telegramResponse = await fetch(
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

        const telegramData = await telegramResponse.json();

        if (!telegramData.ok) {
            return {
                statusCode: 500,
                body: JSON.stringify({
                    success: false,
                    error: "Telegram message failed"
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
                error: "Server error"
            })
        };
    }
};
