import React, { useState, useEffect } from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';
import FileUpload from './components/FileUpload';
import FormatSelector from './components/FormatSelector';
import ConversionStatus from './components/ConversionStatus';
import { detectFileFormat, getOutputFileName } from './utils/fileUtils';

type ConversionStatus = 'idle' | 'converting' | 'success' | 'error';

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fromFormat, setFromFormat] = useState('epub');
  const [toFormat, setToFormat] = useState('fb2');
  const [status, setStatus] = useState<ConversionStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [convertedFile, setConvertedFile] = useState<Blob | null>(null);

  useEffect(() => {
    if (selectedFile) {
      const detectedFormat = detectFileFormat(selectedFile);
      if (detectedFormat) {
        setFromFormat(detectedFormat);
      }
    }
  }, [selectedFile]);

  const handleConvert = async () => {
    if (!selectedFile) return;
    
    setStatus('converting');
    setErrorMessage('');
    setConvertedFile(null);

    try {
      // Simulate conversion process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate conversion by creating a new blob with the same content
      // In a real implementation, this would be the converted file from the backend
      const reader = new FileReader();
      
      reader.onload = async () => {
        const convertedBlob = new Blob([reader.result as ArrayBuffer], {
          type: `application/${toFormat}`
        });
        setConvertedFile(convertedBlob);
        setStatus('success');
      };

      reader.onerror = () => {
        throw new Error('Failed to process file');
      };

      reader.readAsArrayBuffer(selectedFile);
      
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred');
    }
  };

  const handleDownload = () => {
    if (!convertedFile || !selectedFile) return;

    const outputFileName = getOutputFileName(selectedFile.name, toFormat);
    const downloadUrl = URL.createObjectURL(convertedFile);
    
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = outputFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(downloadUrl);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="w-12 h-12 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            E-book Format Converter
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Convert your e-books between popular formats including EPUB, MOBI, PDF, TXT, and FB2.
            Fast, secure, and free.
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <FormatSelector
              selectedFormat={fromFormat}
              onFormatChange={setFromFormat}
              direction="from"
            />
            
            <div className="flex items-center justify-center">
              <div className="p-4 bg-gray-50 rounded-full">
                <ArrowRight className="w-6 h-6 text-gray-400" />
              </div>
            </div>

            <FormatSelector
              selectedFormat={toFormat}
              onFormatChange={setToFormat}
              direction="to"
            />
          </div>

          <div className="mt-12">
            <FileUpload
              onFileSelect={setSelectedFile}
              selectedFile={selectedFile}
            />
            <ConversionStatus 
              status={status} 
              errorMessage={errorMessage}
              onDownload={convertedFile ? handleDownload : undefined}
            />
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={handleConvert}
              disabled={!selectedFile || status === 'converting'}
              className={`px-8 py-3 rounded-lg font-medium text-white transition-all
                ${!selectedFile || status === 'converting'
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
                }`}
            >
              {status === 'converting' ? 'Converting...' : 'Convert Now'}
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            {
              title: 'Secure Conversion',
              description: 'Your files are processed securely and deleted after conversion'
            },
            {
              title: 'Fast Processing',
              description: 'Advanced algorithms ensure quick conversion without quality loss'
            },
            {
              title: 'Multiple Formats',
              description: 'Support for all major e-book formats with more being added'
            }
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;