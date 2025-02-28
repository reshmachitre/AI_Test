// =========================================
// CONFIGURATION AND HELPER FUNCTIONS
// =========================================

// Setting up headers for the Anthropics API (authentication and content type)
const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${secret_value('anthropic-key')}`
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

// Function to call the Anthropics API for chat completion
function chatCompletion(prompt, debug = false) {
    const logger = createLogger(debug);
    const apiUrl = "https://api.anthropic.com/v1/messages";

    
    
    const payload = {
        model: "claude-3", // Replace with the desired model
        messages: [{ role: "user", content: prompt }],
        max_tokens: 100
    };

    logger.log("Payload prepared for Anthropics API request.");

    try {
        const response = web_request(apiUrl, 'post', payload, headers);
        logger.log("Received response from Anthropics API.");
        return debug ? { response, logs: logger.getLogs() } : response;
    } catch (error) {
        logger.log(`Error calling Anthropics API: ${error}`);
        return { error: "Error calling Anthropics API", logs: logger.getLogs() };
    }
}

// Example usage:
const debugMode = false;

var anthropicProvider = SalsifyAI.anthropicProvider(secret_value('anthropic-key'));
result =  anthropicProvider.generateText('Sample prompt', {
  debugPrompt: true,
  max_tokens: 100
});
