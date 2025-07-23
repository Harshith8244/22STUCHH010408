// Redirect.jsx
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Redirect() {
  const { code } = useParams();

  useEffect(() => {
    const stored = localStorage.getItem(code);
    if (stored) {
      const { longUrl, expiresAt } = JSON.parse(stored);
      if (Date.now() < expiresAt) {
        window.location.href = longUrl;
      } else {
        alert('This link has expired.');
      }
    } else {
      alert('Short URL not found.');
    }
  }, [code]);

  return <p>Redirecting...</p>;
}

export default Redirect;
