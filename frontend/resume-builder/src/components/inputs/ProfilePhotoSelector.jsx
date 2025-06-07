import React, { useRef, useState } from 'react';
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage, preview, setPreview }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const preview = URL.createObjectURL(file);
      if (setPreview) setPreview(preview);
      setPreviewUrl(preview);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
    if (setPreview) setPreview(null);
  };

  const onChooseFile = () => {
    inputRef.current?.click();
  };

  return (
    <div className="flex justify-center mb-6 relative">
      {/* ✅ Native hidden file input */}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        ref={inputRef}
        className="hidden"
      />

      {/* 👤 Icon or 🖼️ Preview */}
      {!image ? (
        <div
          className="w-20 h-20 flex items-center justify-center bg-purple-100 rounded-full cursor-pointer relative"
          onClick={onChooseFile}
        >
          <LuUser className="text-4xl text-purple-500" />
          <div className="absolute bottom-0 right-0 bg-purple-600 text-white p-1 rounded-full">
            <LuUpload size={14} />
          </div>
        </div>
      ) : (
        <div className="relative">
          <img
            src={preview || previewUrl}
            alt="profile"
            className="w-20 h-20 rounded-full object-cover"
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1"
          >
            <LuTrash />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
