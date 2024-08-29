'use client';

import React, { useState, useEffect } from 'react';

const titles = [
  "Software Developer",
  "Integrations Expert",
  "Marketer",
  "Copywriter",
  "Dev Consultant",
  "AI Consultant"
];

const TypewriterEffect = () => {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentTitle = titles[currentTitleIndex];

    const typeEffect = () => {
      if (!isDeleting && currentText.length < currentTitle.length) {
        setCurrentText(currentTitle.slice(0, currentText.length + 1));
      } else if (isDeleting && currentText.length > 0) {
        setCurrentText(currentText.slice(0, -1));
      } else if (currentText.length === currentTitle.length) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (currentText.length === 0) {
        setIsDeleting(false);
        setCurrentTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
      }
    };

    const typingInterval = setInterval(typeEffect, isDeleting ? 50 : 150);

    return () => clearInterval(typingInterval);
  }, [currentText, isDeleting, currentTitleIndex]);

  return (
    <div className="h-8 text-xl">
      <span>{currentText}</span>
    </div>
  );
};

export default TypewriterEffect;