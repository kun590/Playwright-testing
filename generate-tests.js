// generate-tests.js
const Anthropic = require("@anthropic-ai/sdk");

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

async function generateTest(description) {
  const message = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 2000,
    messages: [
      {
        role: "user",
        content: `Write a Playwright test in JavaScript for this scenario on https://www.cashewnotes.com/:
        
        ${description}
        
        Use @playwright/test syntax. Include proper assertions.`,
      },
    ],
  });

  console.log(message.content[0].text);
}

generateTest("Test that the homepage loads and the main navigation links work");