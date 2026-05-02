import { useState, useEffect } from 'react';
import { getCachedImage, setCachedImage } from '@/lib/imageCache';

const usePexelsImage = (query: string) => {
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const normalizedQuery = query.trim();
    if (!normalizedQuery) {
      setImageUrl('');
      setLoading(false);
      return;
    }

    setLoading(true);

    // Check cache first
    const cached = getCachedImage(normalizedQuery);
    if (cached) {
      setImageUrl(cached);
      setLoading(false);
      return;
    }

    fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(normalizedQuery)}&per_page=1&orientation=landscape`,
      {
        headers: {
          Authorization: import.meta.env.VITE_PEXELS_API_KEY,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log('Pexels response:', data);
        const url = data.photos[0]?.src?.large || '';
        console.log('Image URL:', url);
        setCachedImage(normalizedQuery, url);
        setImageUrl(url);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [query]);

  return { imageUrl, loading };
};

export default usePexelsImage;
