import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import QRForm from './components/QRForm';
import QRImage from './components/QRImage';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [imageUrl, setImageUrl] = useState('');
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const props = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1000 }
  });

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <animated.div style={props}>
      <div className="switch-wrapper">
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            id="themeSwitch"
            checked={theme === 'dark'}
            onChange={toggleTheme}
          />
          <label className="form-check-label" htmlFor="themeSwitch"></label>
        </div>
      </div>
      <div className={`container ${theme}`}>
        <h1>QR Code Generator</h1>
        <QRForm onQRGenerated={setImageUrl} />
        <QRImage imageUrl={imageUrl} />
      </div>
    </animated.div>
  );
}

export default App;
