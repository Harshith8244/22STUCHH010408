import axios from 'axios';

const LOGGING_SERVER_URL = "http://localhost:5173/log";

function Log(level, pkg, message) {
    const stack = new Error().stack;

    const logData = {
        stack: stack,
        level: level,
        package: pkg,
        message: message,
        timestamp: new Date().toISOString()
    };

    axios.post(LOGGING_SERVER_URL, logData)
        .then(response => {
            console.log("Log sent successfully:", response.status);
        })
        .catch(error => {
            console.error("Error sending log:", error);
            if (error.response) {
                console.error("Server Error:", error.response.status, error.response.data);
            } else if (error.request) {
                console.error("Network Error:", error.request);
            } else {
                console.error("Request Setup Error:", error.message);
            }
        });
}

export default Log;