import { useEffect, useRef, useState } from 'react';

export const useIntersectionObserver = (options = {}) => {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      // Solo consideramos la sección visible cuando está en el centro de la pantalla
      const isInView = entry.isIntersecting && 
        entry.intersectionRatio >= 0.5 && 
        entry.boundingClientRect.top <= window.innerHeight / 2;

      setIsVisible(isInView);
    }, {
      threshold: [0, 0.5, 1],
      ...options
    });

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [elementRef, options]);

  return [elementRef, isVisible];
}; 