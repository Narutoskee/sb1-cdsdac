import React from 'react';
import { Loader2, CheckCircle, AlertCircle, Download } from 'lucide-react';

interface ConversionStatusProps {
  status: 'idle' | 'converting' | 'success' | 'error';
  errorMessage?: string;
  onDownload?: () => void;
}

export default function ConversionStatus({ status, errorMessage, onDownload }: ConversionStatusProps) {
  if (status === 'idle') return null;

  const statusConfig = {
    converting: {
      icon: <Loader2 className="w-5 h-5 animate-spin text-blue-500" />,
      text: 'Converting your file...',
      className: 'bg-blue-50 text-blue-700'
    },
    success: {
      icon: <CheckCircle className="w-5 h-5 text-green-500" />,
      text: 'Conversion completed successfully!',
      className: 'bg-green-50 text-green-700'
    },
    error: {
      icon: <AlertCircle className="w-5 h-5 text-red-500" />,
      text: errorMessage || 'An error occurred during conversion',
      className: 'bg-red-50 text-red-700'
    }
  };

  const config = statusConfig[status];

  return (
    <div className={`mt-4 p-4 rounded-lg flex items-center justify-between ${config.className}`}>
      <div className="flex items-center space-x-3">
        {config.icon}
        <span className="font-medium">{config.text}</span>
      </div>
      {status === 'success' && onDownload && (
        <button
          onClick={onDownload}
          className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>Download</span>
        </button>
      )}
    </div>
  );
}