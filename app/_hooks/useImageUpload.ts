import { useState, useRef } from 'react';

export const useImageUpload = () => {
  const [previewImgs, setPreviewImgs] = useState<FileList | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const fileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setPreviewImgs(files);
    }
  };

  const uploadImage = async () => {
    if (previewImgs) {
      const formData = new FormData();

      for (let i = 0; i < previewImgs.length; i++) {
        formData.append('img', previewImgs[i]);
      }

      const result = await fetch('/api/image', {
        method: 'POST',
        body: formData,
      }).then((res) => res.json());

      if (result.message === 'OK') {
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
    uploadImage,
  };
};
