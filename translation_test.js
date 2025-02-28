

const request = require('sync-request');

// =========================================
// CONFIGURATION AND HELPER FUNCTIONS
// =========================================

// Setting up headers for the Anthropics API (authentication and content type)
const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${secret_value('open-ai-key')}`
};

// Logging utility that accumulates logs if debug mode is enabled
function createLogger(debug) {
    const logs = [];
    return {
        log: (message) => {
            if (debug) {
                logs.push(message);
            }
        },
        getLogs: () => logs
    };
}

// Function to call the Anthropics API for chat completion synchronously
function chatCompletion(prompt, debug) {
    const logger = createLogger(debug);
    const apiUrl = "https://api.anthropic.com/v1/complete";

    const payload = {
        model: "claude-v1", // Replace with the desired model
        prompt: prompt,
        max_tokens: 100
    };

    logger.log("Payload prepared for Anthropics API request.");

    try {
        const res = request('POST', apiUrl, {
            json: payload,
            headers: headers
        });

        const responseData = JSON.parse(res.getBody('utf8'));
        logger.log("Received response from Anthropics API.");

        return debug ? { response: responseData, logs: logger.getLogs() } : responseData;
    } catch (error) {
        logger.log(`Error calling Anthropics API: ${error}`);
        return { error: "Error calling Anthropics API", logs: logger.getLogs() };
    }
}

// Example usage:
const debugMode = false;
const response = chatCompletion("Hello, how are you?", debugMode);
console.log(response);


const debugPrompt = false;
chatCompletion
