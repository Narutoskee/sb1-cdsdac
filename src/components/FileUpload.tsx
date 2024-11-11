import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileUp, File, X } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
}

export default function FileUpload({ onFileSelect, selectedFile }: FileUploadProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles[0]) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      'application/epub+zip': ['.epub'],
      'application/x-mobipocket-ebook': ['.mobi'],
      'application/pdf': ['.pdf'],
      'text/plain': ['.txt'],
      'application/xml': ['.fb2']
    }
  });

  return (
    <div className="w-full max-w-xl mx-auto">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`}
      >
        <input {...getInputProps()} />
        <FileUp className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        {isDragActive ? (
          <p className="text-lg text-blue-500 font-medium">Drop your e-book here...</p>
        ) : (
          <div>
            <p className="text-lg text-gray-600 font-medium">
              Drag & drop your e-book here, or click to select
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Supported formats: EPUB, MOBI, PDF, TXT, FB2
            </p>
          </div>
        )}
      </div>

      {selectedFile && (
        <div className="mt-4 p-4 bg-white rounded-lg shadow-sm border flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <File className="w-5 h-5 text-blue-500" />
            <div>
              <p className="font-medium text-gray-900">{selectedFile.name}</p>
              <p className="text-sm text-gray-500">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          <button
            onClick={() => onFileSelect(null as any)}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      )}
    </div>
  );
}