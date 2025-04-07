import { useState, useEffect, useRef } from 'react';

const TypewriterText = ({ text, speed = 50 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);
  const [lineBreaks, setLineBreaks] = useState([]);

  useEffect(() => {
    // Función para calcular dónde añadir saltos de línea
    const calculateLineBreaks = () => {
      if (!containerRef.current) return;
      
      const container = containerRef.current;
      const containerWidth = container.offsetWidth;
      const tempSpan = document.createElement('span');
      tempSpan.style.visibility = 'hidden';
      tempSpan.style.position = 'absolute';
      tempSpan.style.whiteSpace = 'pre';
      document.body.appendChild(tempSpan);
      
      const breaks = [];
      let currentLine = '';
      
      // Dividir el texto en palabras
      const words = text.split(' ');
      
      for (let i = 0; i < words.length; i++) {
        const testLine = currentLine + (currentLine ? ' ' : '') + words[i];
        tempSpan.textContent = testLine;
        
        if (tempSpan.offsetWidth > containerWidth && currentLine) {
          // Encontrar la última coma o espacio en la línea actual
          const lastComma = currentLine.lastIndexOf(',');
          const lastSpace = currentLine.lastIndexOf(' ');
          const breakPoint = lastComma > lastSpace ? lastComma : lastSpace;
          
          if (breakPoint > 0) {
            breaks.push(breakPoint);
            currentLine = currentLine.substring(breakPoint + 1);
          } else {
            breaks.push(currentLine.length);
            currentLine = '';
          }
        }
        
        currentLine = testLine;
      }
      
      document.body.removeChild(tempSpan);
      setLineBreaks(breaks);
    };
    
    calculateLineBreaks();
    
    // Recalcular cuando cambie el tamaño de la ventana
    window.addEventListener('resize', calculateLineBreaks);
    return () => window.removeEventListener('resize', calculateLineBreaks);
  }, [text]);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(text.substring(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, speed);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, text, speed]);

  // Función para renderizar el texto con saltos de línea
  const renderText = () => {
    if (!lineBreaks.length) return displayText;
    
    let result = '';
    let lastBreak = 0;
    
    for (let i = 0; i < lineBreaks.length; i++) {
      const breakPoint = lineBreaks[i];
      if (breakPoint <= displayText.length) {
        result += displayText.substring(lastBreak, breakPoint) + '\n';
        lastBreak = breakPoint;
      }
    }
    
    result += displayText.substring(lastBreak);
    return result;
  };

  return (
    <div ref={containerRef} className="typewriter-container">
      <p className="typewriter-text">
        {renderText().split('\n').map((line, i) => (
          <span key={i}>
            {line}
            {i < renderText().split('\n').length - 1 && <br />}
          </span>
        ))}
      </p>
    </div>
  );
};

export default TypewriterText; 