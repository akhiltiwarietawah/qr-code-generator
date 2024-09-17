import React from 'react';

const QRImage = ({ imageUrl }) => {
  return (
    imageUrl && <img src={imageUrl} alt="QR Code" />
  );
};

export default QRImage;
