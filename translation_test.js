

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

// Function to make a synchronous HTTP request (compatible with mini-racer)
function syncHttpRequest(url, method, data, headers, logger) {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, false); // false makes it synchronous

    // Set headers
    for (const key in headers) {
        xhr.setRequestHeader(key, headers[key]);
    }

    logger.log(`Sending ${method} request to ${url}`);

    try {
        xhr.send(JSON.stringify(data));

        if (xhr.status >= 200 && xhr.status < 300) {
            logger.log("Received successful response from Anthropics API.");
            return JSON.parse(xhr.responseText);
        } else {
            logger.log(`HTTP Error: ${xhr.status} - ${xhr.statusText}`);
            return { error: `HTTP Error: ${xhr.status} - ${xhr.statusText}` };
        }
    } catch (error) {
        logger.log(`Request failed: ${error}`);
        return { error: "Request failed", details: error };
    }
}

// Function to call the Anthropics API for chat completion
function chatCompletion(prompt, debug = false) {
  

// Example usage:
const debugMode = false;
const response = chatCompletion("Hello, how are you?", debugMode);
console.log(response);
response
