import { useEffect, useRef } from 'react';

const useLazyImage = ({ disabled = false }) => {
  const imgRef = useRef(null);

  useEffect(() => {
    if (disabled) return;

    const img = imgRef.current;
    if (!img) return;

    const dataSrc = img.dataset.src;
    if (!dataSrc) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        img.src = dataSrc;
        observer.disconnect();
      },
      { threshold: 0.1 },
    );

    observer.observe(imgRef.current);
  }, [disabled]);

  return imgRef;
};

export default useLazyImage;
