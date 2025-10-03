import React from 'react';

interface ProductCardProps {
  sku: string;
  productId: string;
  title?: string;
  image?: string;
  url: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  sku, 
  productId, 
  title, 
  image, 
  url 
}) => {
  const displayTitle = title || `Product: ${sku}`;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-soft-sm dark:shadow-dark-sm hover:shadow-soft-md dark:hover:shadow-dark-md hover:scale-105 transition-all duration-200 ease-in-out">
      {/* Product Image */}
      <div className="w-full h-40 bg-gray-100 dark:bg-gray-700 rounded-t-xl overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={displayTitle}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg
              className="w-10 h-10 text-gray-400 dark:text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Product Title */}
        <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-2 leading-tight transition-colors duration-300 ease-in-out">
          {displayTitle}
        </h3>
        
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

export default ProductCard;
