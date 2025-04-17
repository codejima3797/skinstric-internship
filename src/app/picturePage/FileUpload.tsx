"use client";

import React from "react";
import axios from "axios";

interface UploadResponse {
  success: boolean;
  message: string;
}

interface FileUploadProps {
  onUploadSuccess: (response: UploadResponse) => void;
  onUploadError?: (error: any) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onUploadSuccess,
  onUploadError,
}) => {
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];

      const toBase64 = (file: File): Promise<string> =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = (error) => reject(error);
        });

      try {
        const base64String = await toBase64(file);

        const response = await axios.post<UploadResponse>(
          "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo",
          { image: base64String },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        onUploadSuccess(response.data);
      } catch (error) {
        console.error("Error uploading image:", error);
        if (onUploadError) onUploadError(error);
      }
    }
  };

  return (
    <input
      id="gallery-input"
      type="file"
      accept="image/*"
      className="hidden"
      onChange={handleFileChange}
    />
  );
};

export default FileUpload;
