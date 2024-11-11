export const detectFileFormat = (file: File): string => {
  const extension = file.name.toLowerCase().split('.').pop() || '';
  
  const formatMap: { [key: string]: string } = {
    'epub': 'epub',
    'mobi': 'mobi',
    'pdf': 'pdf',
    'txt': 'txt',
    'fb2': 'fb2'
  };

  return formatMap[extension] || '';
};

export const formatFileSize = (bytes: number): string => {
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(2)} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

export const getOutputFileName = (originalName: string, newFormat: string): string => {
  const nameWithoutExt = originalName.substring(0, originalName.lastIndexOf('.'));
  return `${nameWithoutExt}.${newFormat}`;
};