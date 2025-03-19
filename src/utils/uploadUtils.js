
/**
 * Handles file upload preview and validation
 * @param {File} file - The file to preview
 * @param {Function} setPreviewUrl - State setter for preview URL
 * @param {Function} setError - State setter for error message
 * @returns {boolean} - Whether the file is valid
 */
export const handleFilePreview = (file, setPreviewUrl, setError) => {
  const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
  const maxSize = 5 * 1024 * 1024; // 5MB
  
  if (!validTypes.includes(file.type)) {
    setError('File must be a JPG, PNG or PDF');
    return false;
  }
  
  if (file.size > maxSize) {
    setError('File must be less than 5MB');
    return false;
  }
  
  // Create preview URL for image files
  if (file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  } else {
    // For PDFs, just show an icon or text
    setPreviewUrl('pdf-document');
  }
  
  return true;
};

/**
 * Mock function to upload files to server
 * This would be replaced with actual API calls in production
 */
export const uploadFile = async (file, userId, documentType) => {
  // In a real implementation, this would upload to a server/cloud storage
  console.log(`Uploading ${documentType} for user ${userId}`);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return a mock URL that would normally come from the server
  return {
    success: true,
    fileUrl: `https://example.com/uploads/${userId}/${documentType}-${Date.now()}`
  };
};
