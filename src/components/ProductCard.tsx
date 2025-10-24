import React from "react";

interface ProductCardProps {
  sku: string;
  productId: string;
  title?: string;
  image?: string;
  imageUrl?: string;
  description?: string;
  url: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  sku,
  productId,
  title,
  image,
  imageUrl,
  description,
  url,
}) => {
  const displayTitle = title || `Product: ${sku}`;
  const productImage = imageUrl || image;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-soft-sm dark:shadow-dark-sm hover:shadow-soft-md dark:hover:shadow-dark-md hover:scale-105 transition-all duration-200 ease-in-out">
      {/* Product Image */}
      {productImage && (
        <div className="w-full h-56 bg-white dark:bg-gray-800 rounded-t-xl overflow-hidden flex items-center justify-center">
          <img
            src={productImage}
            alt={displayTitle}
            className="w-full h-full object-contain"
          />
        </div>
      )}

      {/* Product Image Placeholder (only if no image) */}
      {!productImage && (
        <div className="w-full h-56 bg-white dark:bg-gray-800 rounded-t-xl overflow-hidden">
          <div className="w-full h-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-gray-400 dark:text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>
      )}

      {/* Product Info */}
      <div className="p-4">
        {/* Product Title */}
        <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-2 leading-tight transition-colors duration-300 ease-in-out">
          {displayTitle}
        </h3>

        {/* Product Description */}
        {description && (
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300 ease-in-out mb-3 line-clamp-2">
            {description}
          </p>
        )}

        {/* SKU and Product ID */}
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed transition-colors duration-300 ease-in-out mb-3">
          SKU: {sku} | Product ID: {productId}
        </p>

        {/* View Product Button */}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 bg-[#2563EB] text-white text-sm font-medium rounded-full hover:bg-blue-600 transition-colors duration-200 ease-in-out"
        >
          View Product
          <svg
            className="w-4 h-4 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};
