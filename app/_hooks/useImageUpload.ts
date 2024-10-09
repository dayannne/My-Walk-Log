import { useState, useRef } from 'react';

export const useImageUpload = () => {
  const [previewImgs, setPreviewImgs] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (previewImgs.length === 3) {
      alert('이미지 업로드는 3장까지 가능합니다.');
      return;
    }
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const fileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setPreviewImgs((prevImgs) => [...prevImgs, ...Array.from(files)]);
    }
  };

  const removeImage = (index: number) => {
    setPreviewImgs((prevImgs) => prevImgs.filter((_, i) => i !== index));
  };

  const uploadImage = async () => {
    if (previewImgs.length > 0) {
      const formData = new FormData();
      previewImgs.forEach((file) => {
        formData.append('img', file);
      });

      const result = await fetch('/api/image', {
        method: 'POST',
        body: formData,
      }).then((res) => res.json());

      if (result.status === 'success') {
        return result.data;
      } else {
        alert('이미지 저장에 실패했습니다.');
      }
    }
  };

  return {
    previewImgs,
    fileInputRef,
    handleButtonClick,
    fileHandler,
    removeImage,
    uploadImage,
  };
};
