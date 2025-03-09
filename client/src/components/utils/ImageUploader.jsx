import { useState, useRef } from 'react';
import { FaUpload, FaImage, FaTimes } from 'react-icons/fa';
import axios from 'axios';

/**
 * Component for handling image uploads with preview
 * 
 * @param {Object} props
 * @param {Function} props.onImageUpload - Callback function when image is uploaded
 * @param {String} props.initialImage - Initial image URL (if any)
 * @param {String} props.label - Label for the upload button
 */
const ImageUploader = ({ onImageUpload, initialImage = '', label = 'Upload Image' }) => {
  const [image, setImage] = useState(initialImage);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  // Handle file selection
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('Please select a valid image file (JPEG, PNG, GIF, or WEBP)');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }

    setError('');
    setIsUploading(true);

    try {
      // Create form data
      const formData = new FormData();
      formData.append('image', file);

      // Upload image to server
      const response = await axios.post('/api/uploads', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Set the image URL returned from server
      const imageUrl = response.data.url;
      setImage(imageUrl);
      onImageUpload(imageUrl);
    } catch (err) {
      console.error('Error uploading image:', err);
      setError(err.response?.data?.message || 'Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  // Trigger file input click
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  // Remove current image
  const handleRemoveImage = () => {
    setImage('');
    onImageUpload('');
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full">
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Upload button or preview */}
      {!image ? (
        <div className="mt-1">
          <button
            type="button"
            onClick={handleUploadClick}
            disabled={isUploading}
            className={`border-2 border-dashed border-gray-300 rounded-md p-6 w-full flex flex-col items-center justify-center hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              isUploading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isUploading ? (
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
            ) : (
              <>
                <FaUpload className="mx-auto h-8 w-8 text-gray-400" />
                <span className="mt-2 block text-sm font-medium text-gray-700">{label}</span>
                <span className="mt-1 block text-xs text-gray-500">
                  PNG, JPG, GIF, WEBP up to 5MB
                </span>
              </>
            )}
          </button>
        </div>
      ) : (
        <div className="mt-1 relative">
          <div className="relative rounded-md overflow-hidden border border-gray-200">
            <img
              src={image}
              alt="Uploaded preview"
              className="w-full h-auto max-h-48 object-contain"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-red-100"
              title="Remove image"
            >
              <FaTimes className="text-red-500" />
            </button>
          </div>
          <button
            type="button"
            onClick={handleUploadClick}
            className="mt-2 inline-flex items-center px-3 py-1 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <FaImage className="mr-2" />
            Change Image
          </button>
        </div>
      )}

      {/* Error message */}
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default ImageUploader;
