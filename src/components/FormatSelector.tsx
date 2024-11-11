import React from 'react';
import { FileType } from 'lucide-react';

interface Format {
  id: string;
  name: string;
  extension: string;
}

interface FormatSelectorProps {
  selectedFormat: string;
  onFormatChange: (format: string) => void;
  direction: 'from' | 'to';
}

export default function FormatSelector({ selectedFormat, onFormatChange, direction }: FormatSelectorProps) {
  const formats: Format[] = [
    { id: 'epub', name: 'EPUB', extension: '.epub' },
    { id: 'mobi', name: 'MOBI', extension: '.mobi' },
    { id: 'pdf', name: 'PDF', extension: '.pdf' },
    { id: 'txt', name: 'TXT', extension: '.txt' },
    { id: 'fb2', name: 'FB2', extension: '.fb2' },
  ];

  return (
    <div className="w-full max-w-xs">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {direction === 'from' ? 'Convert from:' : 'Convert to:'}
      </label>
      <div className="grid grid-cols-1 gap-2">
        {formats.map((format) => (
          <button
            key={format.id}
            onClick={() => onFormatChange(format.id)}
            className={`flex items-center space-x-3 p-3 rounded-lg border transition-all
              ${selectedFormat === format.id
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50'
              }`}
          >
            <FileType className="w-5 h-5" />
            <span className="font-medium">{format.name}</span>
            <span className="text-sm text-gray-500">{format.extension}</span>
          </button>
        ))}
      </div>
    </div>
  );
}