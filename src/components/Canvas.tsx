import React from 'react';

interface CanvasProps {
  url: string;
  display?: string;
  height?: number;
  agent_enabled?: boolean;
  show_inline?: boolean;
}

const Canvas: React.FC<CanvasProps> = ({ 
  url, 
  display = 'no-border', 
  height = 300, 
  agent_enabled = false,
  show_inline = true 
}) => {
  // Extract product information from URL
  const extractProductInfo = (url: string) => {
    try {
      const urlObj = new URL(url);
      const sku = urlObj.searchParams.get('sku');
      const pid = urlObj.searchParams.get('pid');
      return { sku, pid };
    } catch (error) {
      return { sku: null, pid: null };
    }
  };

  const { sku, pid } = extractProductInfo(url);

  // If this is a product URL, render as a product card
  if (sku && pid) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-soft-sm dark:shadow-dark-sm hover:shadow-soft-md dark:hover:shadow-dark-md transition-shadow duration-200 ease-in-out">
        <div className="w-full h-40 bg-gray-100 dark:bg-gray-700 rounded-t-xl flex items-center justify-center transition-colors duration-300 ease-in-out">
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
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2 leading-tight transition-colors duration-300 ease-in-out">
            Product: {sku}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed transition-colors duration-300 ease-in-out mb-3">
            SKU: {sku} | Entity ID: {pid}
          </p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-3 py-2 bg-[#2563EB] text-white text-sm font-medium rounded-full hover:bg-blue-600 transition-colors duration-200 ease-in-out"
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
  }

  // For non-product URLs, render as an embedded iframe or placeholder
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-soft-sm dark:shadow-dark-sm transition-shadow duration-200 ease-in-out">
      <div 
        className="w-full rounded-t-xl overflow-hidden"
        style={{ height: `${height}px` }}
      >
        {show_inline ? (
          <iframe
            src={url}
            className="w-full h-full border-0"
            title="Canvas Content"
            sandbox="allow-scripts allow-same-origin allow-forms"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
            <div className="text-center">
              <svg
                className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Canvas Content
              </p>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center mt-2 px-3 py-1 bg-[#2563EB] text-white text-xs font-medium rounded-full hover:bg-blue-600 transition-colors duration-200 ease-in-out"
              >
                Open
                <svg
                  className="w-3 h-3 ml-1"
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
        )}
      </div>
    </div>
  );
};

export default Canvas;
