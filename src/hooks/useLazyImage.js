import { useEffect, useRef } from 'react';

const useLazyImage = ({ disabled = false }) => {
  const imgRef = useRef(null);

  useEffect(() => {
    if (disabled) return;

    const img = imgRef.current;
    if (!img) return;
    if (!img.dataset.src) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const { target } = entry;
            target.src = entry.target.getAttribute('data-src');

            observer.unobserve(target);
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
