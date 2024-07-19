import { useState, useRef } from 'react';

export const useImageUpload = () => {
  const [previewImg, setPreviewImg] = useState<FileList | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const fileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setPreviewImg(files);
    }
  };

  const uploadImage = async () => {
    if (previewImg) {
      const formData = new FormData();

      for (let i = 0; i < previewImg.length; i++) {
        formData.append('img', previewImg[i]);
      }

      const result = await fetch('/api/image', {
        method: 'POST',
        body: formData,
      }).then((res) => res.json());

      if (result.message === 'OK') {
        alert('이미지가 저장되었습니다.');
      } else {
        alert('이미지 저장에 실패했습니다.');
      }
    }
  };

  return {
    previewImg,
    fileInputRef,
    handleButtonClick,
    fileHandler,
    uploadImage,
  };
};
