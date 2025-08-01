import Image from 'next/image';
import { useEffect, useState, useRef, useCallback } from 'react';

type GalleryImage = {
  id: string;
  download_url: string;
  author: string;
};

export default function Home() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const loadImages = useCallback(async () => {
    if (!hasMore) return;

    const res = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=20`);
    const data: GalleryImage[] = await res.json();

    setImages((prev) => [...prev, ...data]);
    setHasMore(data.length > 0);
  }, [page, hasMore]);

  useEffect(() => {
    loadImages();
  }, [page, loadImages]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 }
    );

    const current = loaderRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [hasMore]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Gallery</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((img) => (
          <div key={img.id} className="relative w-full aspect-video rounded-lg overflow-hidden shadow hover:shadow-lg transition">
            <Image
              src={`https://picsum.photos/id/${img.id}/600/400`}
              alt={img.author}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ))}
      </div>

      {hasMore && (
        <div ref={loaderRef} className="text-center py-10 text-gray-500">
          Loading more...
        </div>
      )}
    </div>
  );
}
