import { useState } from 'react'
import './App.css'

function App() {
  const [url, setUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [customCode, setCustomCode] = useState('')
  const [validity, setValidity] = useState(30)

  function handleSubmit(e) {
  e.preventDefault()
  const code = customCode || Math.random().toString(36).substring(2, 8)
  const fullUrl = `http://localhost:3000/${code}`

  const stored = JSON.parse(localStorage.getItem('urlMappings') || '{}')
  stored[code] = url
  localStorage.setItem('urlMappings', JSON.stringify(stored))

  setShortUrl(fullUrl)
}

  return (
    <div style={{ padding: '20px' }}>
      <h2>URL Shortener</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Enter long URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Custom shortcode (optional)"
            value={customCode}
            onChange={(e) => setCustomCode(e.target.value)}
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Validity in minutes"
            value={validity}
            onChange={(e) => setValidity(e.target.value)}
            min="1"
          />
        </div>
        <button type="submit">Shorten</button>
      </form>
      {shortUrl && (
        <div>
          <p>Shortened URL:</p>
          <a href={shortUrl}>{shortUrl}</a>
        </div>
      )}
    </div>
  )
}

export default App