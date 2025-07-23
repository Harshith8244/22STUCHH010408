import { useState } from 'react';

function App() {
  // State variables to manage the URL, short URL, custom code, validity, and errors
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [validity, setValidity] = useState(30); // Default validity in minutes
  const [error, setError] = useState('');
  const [copyMessage, setCopyMessage] = useState(''); // State for copy confirmation message

  /**
   * Validates if the given input string is a valid URL.
   * @param {string} input - The URL string to validate.
   * @returns {boolean} - True if the URL is valid, false otherwise.
   */
  function validateUrl(input) {
    try {
      new URL(input);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Handles the form submission for URL shortening.
   * Prevents default form submission, validates the URL, generates a short code,
   * and sets the shortened URL.
   * @param {Event} e - The form submission event.
   */
  function handleSubmit(e) {
    e.preventDefault(); // Prevent default form submission
    setError(''); // Clear any previous errors
    setCopyMessage(''); // Clear any previous copy messages

    // Validate the entered URL
    if (!validateUrl(url)) {
      setError('Please enter a valid URL (e.g., https://example.com)');
      return;
    }

    // Generate a custom code if provided, otherwise generate a random one
    const code = customCode.trim() || Math.random().toString(36).substring(2, 8);
    // Construct the full shortened URL (placeholder for now, will be dynamic with backend)
    const fullUrl = `http://localhost:5173/${code}`; // In a real app, this would come from a backend
    setShortUrl(fullUrl); // Set the shortened URL
  }

  /**
   * Copies the shortened URL to the clipboard and displays a confirmation message.
   */
  function copyToClipboard() {
    // Use document.execCommand('copy') for better compatibility in iframe environments
    const tempInput = document.createElement('input');
    tempInput.value = shortUrl;
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
      document.execCommand('copy');
      setCopyMessage('Short URL copied to clipboard!');
      // Clear the message after a few seconds
      setTimeout(() => setCopyMessage(''), 3000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      setCopyMessage('Failed to copy URL.');
    } finally {
      document.body.removeChild(tempInput);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
          🔗 URL Shortener
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input
              type="text"
              placeholder="Enter long URL (e.g., https://example.com)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-blue-400 transition duration-200 ease-in-out"
              required
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Custom shortcode (optional)"
              value={customCode}
              onChange={(e) => setCustomCode(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-blue-400 transition duration-200 ease-in-out"
            />
          </div>

          <div>
            <input
              type="number"
              placeholder="Validity in minutes (e.g., 30)"
              value={validity}
              onChange={(e) => setValidity(e.target.value)}
              min="1"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-blue-400 transition duration-200 ease-in-out"
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm text-center font-medium">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold p-3 rounded-lg hover:bg-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md"
          >
            Shorten URL
          </button>
        </form>

        {shortUrl && (
          <div className="mt-8 p-5 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-blue-800 font-semibold mb-2">Shortened URL:</p>
            <div className="flex items-center justify-between space-x-3">
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline break-all text-lg font-medium flex-grow"
              >
                {shortUrl}
              </a>
              <button
                onClick={copyToClipboard}
                className="bg-blue-200 text-blue-800 p-3 rounded-lg hover:bg-blue-300 transition-colors duration-200 ease-in-out shadow-sm flex-shrink-0"
                title="Copy to clipboard"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                  <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2H6zM5 9a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" />
                </svg>
              </button>
            </div>
            {copyMessage && (
              <p className="text-green-600 text-sm mt-3 text-center font-medium">{copyMessage}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;