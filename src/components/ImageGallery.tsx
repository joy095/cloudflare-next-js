import { useState, useEffect } from 'react';
import Image from 'next/image';

type Image = {
    id: string;
    src: string;
    alt: string;
};

type ImageGalleryProps = {
    images: Image[];
};

export default function ImageGallery({ images }: ImageGalleryProps) {
    const [selectedImage, setSelectedImage] = useState<Image | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const openModal = (image: Image) => setSelectedImage(image);
    const closeModal = () => setSelectedImage(null);

    // Handle keyboard events
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeModal();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Handle loading state
    useEffect(() => {
        if (images.length > 0) {
            setIsLoading(false);
        }
    }, [images]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {images.map((image) => (
                    <div
                        key={image.id}
                        className="group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer bg-white"
                        onClick={() => openModal(image)}
                    >
                        <div className="relative aspect-square overflow-hidden">
                            <Image
                                src={image.src}
                                alt={image.alt}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                // height={200}
                                // width={300}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                                <span className="opacity-0 group-hover:opacity-100 text-white text-lg font-semibold transition-opacity duration-300">
                                    View
                                </span>
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="font-medium text-gray-800 truncate">{image.alt}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
                    onClick={closeModal}
                >
                    <div
                        className="relative max-w-6xl max-h-[90vh] w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-4 right-4 text-white text-3xl bg-black bg-opacity-50 rounded-full w-12 h-12 flex items-center justify-center hover:bg-opacity-75 transition z-10"
                            onClick={closeModal}
                            aria-label="Close modal"
                        >
                            &times;
                        </button>
                        <div className="bg-white rounded-lg overflow-hidden">
                            <div className="relative w-full aspect-[4/3] max-h-[80vh]">
                                <Image
                                    src={selectedImage.src}
                                    alt={selectedImage.alt}
                                    fill
                                    sizes="90vw"
                                    className="object-contain"
                                    priority
                                />
                            </div>
                            <div className="p-4 bg-gray-50">
                                <h3 className="text-xl font-semibold text-gray-800 text-center">
                                    {selectedImage.alt}
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}