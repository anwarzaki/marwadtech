import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

export default function MediaUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const { user, logout } = useAuth();

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setMessage('');

    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setMessage('File size exceeds 5MB');
      return;
    }

    if (!file.type.startsWith('image/')) {
      setMessage('Only images are allowed');
      return;
    }

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage('Please select a file');
      return;
    }

    setUploading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await api.post('/api/upload-image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setMessage('Upload successful!');
      setSelectedFile(null);
      setPreview(null);
    } catch (error) {
      console.error('Upload failed:', error);
      setMessage('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Media Upload</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm">Welcome, {user?.name || 'User'}</span>
          <button
            onClick={logout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>

      <nav className="mb-8 flex gap-4 bg-white p-4 rounded-lg shadow">
        <Link to="/dashboard" className="text-gray-600 hover:text-blue-600">Dashboard</Link>
        <Link to="/products" className="text-gray-600 hover:text-blue-600">Products</Link>
        <Link to="/media" className="text-blue-600 font-medium hover:underline">Media Upload</Link>
      </nav>

      <div className="max-w-2xl bg-white p-6 rounded-lg shadow">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 mb-6"
        />

        {preview && (
          <div className="mb-6">
            <img
              src={preview}
              alt="Preview"
              className="max-w-full max-h-80 border border-gray-300 rounded-lg"
            />
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={!selectedFile || uploading}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading ? 'Uploading...' : 'Upload Image'}
        </button>

        {message && (
          <p className={`mt-4 text-sm ${message.includes('success') ? 'text-green-600' : 'text-red-600'
            }`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
