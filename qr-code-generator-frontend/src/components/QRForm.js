// src/components/QRForm.js
import React, { useState } from 'react';
import axios from 'axios';

const QRForm = ({ onQRGenerated }) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/generate-qr', { url }, { responseType: 'blob' });
      const imageUrl = URL.createObjectURL(response.data);
      onQRGenerated(imageUrl);
    } catch (err) {
      setError('Error generating QR code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Generating...' : 'Generate QR Code'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default QRForm;