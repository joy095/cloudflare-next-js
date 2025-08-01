import { GetStaticProps } from 'next';
import ImageGallery from '@/components/ImageGallery';

export const runtime = "experimental-edge";

type Image = {
  id: string;
  src: string;
  alt: string;
};

type HomeProps = {
  images: Image[];
};

export default function Home({ images }: HomeProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="container mx-auto px-4">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Dynamic Image Gallery</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Images loaded from external URLs
          </p>
        </header>

        {images.length > 0 ? (
          <ImageGallery images={images} />
        ) : (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">📷</div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">No Images Found</h2>
            <p className="text-gray-600">
              Add image URLs to the image list in getStaticProps
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Sample external image URLs - replace with your own image sources
export const getStaticProps: GetStaticProps = async () => {
  // Sample image URLs - replace with your own sources
  const imageUrls = [
    {
      id: '1',
      src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
      alt: 'Mountain Landscape'
    },
    {
      id: '2',
      src: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
      alt: 'Ocean Sunset'
    },
    {
      id: '3',
      src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
      alt: 'Forest Path'
    },
    {
      id: '4',
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
      alt: 'Mountain Peak'
    },
    {
      id: '5',
      src: 'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
      alt: 'Lakeside View'
    },
    {
      id: '6',
      src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
      alt: 'Nature Panorama'
    }
  ];

  return {
    props: {
      images: imageUrls,
    },
    revalidate: 60, // Revalidate at most once every 60 seconds
  };
};