
import { useState } from 'react';
import { handleFilePreview, uploadFile } from '@/utils/uploadUtils';
import Button from '@/components/Button';
import { toast } from '@/hooks/use-toast';

const VerificationUpload = ({ userId, onVerificationComplete }) => {
  const [idDocument, setIdDocument] = useState(null);
  const [medicalProof, setMedicalProof] = useState(null);
  const [idPreview, setIdPreview] = useState('');
  const [medicalPreview, setMedicalPreview] = useState('');
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleIdChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setError('');
    if (handleFilePreview(file, setIdPreview, setError)) {
      setIdDocument(file);
    }
  };

  const handleMedicalChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setError('');
    if (handleFilePreview(file, setMedicalPreview, setError)) {
      setMedicalProof(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!idDocument || !medicalProof) {
      setError('Both ID and medical proof documents are required');
      return;
    }
    
    setIsUploading(true);
    
    try {
      // Simulate upload to server
      const idUpload = await uploadFile(idDocument, userId, 'id-verification');
      const medicalUpload = await uploadFile(medicalProof, userId, 'medical-proof');
      
      if (idUpload.success && medicalUpload.success) {
        toast({
          title: 'Verification documents uploaded',
          description: 'Your documents have been submitted for verification',
        });
        onVerificationComplete({
          idUrl: idUpload.fileUrl,
          medicalUrl: medicalUpload.fileUrl,
          status: 'pending'
        });
      }
    } catch (error) {
      console.error('Upload failed:', error);
      setError('Failed to upload documents. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="glass-card p-6 mb-8 animate-reveal">
      <h2 className="text-xl font-semibold mb-4">Verification Documents</h2>
      <p className="text-muted-foreground mb-6">
        Please upload your ID proof and medical fitness certificate for verification.
      </p>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            ID Proof (Aadhar, PAN, Voter ID, etc.)
          </label>
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={handleIdChange}
            className="hidden"
            id="id-upload"
          />
          <label
            htmlFor="id-upload"
            className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-blood transition-colors"
          >
            {idPreview ? (
              idPreview === 'pdf-document' ? (
                <div className="text-center">
                  <svg className="w-10 h-10 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  <span className="mt-2 block text-sm text-gray-600">PDF Document</span>
                </div>
              ) : (
                <img src={idPreview} alt="ID Preview" className="max-h-40 object-contain" />
              )
            ) : (
              <div className="text-center">
                <svg className="w-10 h-10 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                <span className="mt-2 block text-sm text-gray-600">Click to upload ID proof</span>
              </div>
            )}
          </label>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Medical Fitness Certificate
          </label>
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={handleMedicalChange}
            className="hidden"
            id="medical-upload"
          />
          <label
            htmlFor="medical-upload"
            className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-blood transition-colors"
          >
            {medicalPreview ? (
              medicalPreview === 'pdf-document' ? (
                <div className="text-center">
                  <svg className="w-10 h-10 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  <span className="mt-2 block text-sm text-gray-600">PDF Document</span>
                </div>
              ) : (
                <img src={medicalPreview} alt="Medical Certificate Preview" className="max-h-40 object-contain" />
              )
            ) : (
              <div className="text-center">
                <svg className="w-10 h-10 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                <span className="mt-2 block text-sm text-gray-600">Click to upload medical certificate</span>
              </div>
            )}
          </label>
        </div>
        
        <Button
          type="submit"
          variant="primary"
          className="w-full"
          disabled={isUploading || !idDocument || !medicalProof}
        >
          {isUploading ? 'Uploading...' : 'Submit Verification Documents'}
        </Button>
      </form>
    </div>
  );
};

export default VerificationUpload;
