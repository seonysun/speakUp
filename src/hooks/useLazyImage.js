import { useEffect, useRef } from 'react';

const useLazyImage = ({ disabled = false }) => {
  const imgRef = useRef(null);

  useEffect(() => {
    if (disabled) return;
    if (!imgRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = entry.target.getAttribute('data-src');

            observer.unobserve(img);
          }
        });
      },
      { threshold: 0.1 },
    );

    observer.observe(imgRef.current);
  }, [disabled]);

  return imgRef;
};

export default useLazyImage;
