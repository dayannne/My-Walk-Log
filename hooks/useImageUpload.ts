import { useState, useRef, useCallback } from 'react';

export const useImageUpload = () => {
  const [previewImgs, setPreviewImgs] = useState<
    { file: File; previewUrl: string }[]
  >([]);
  const [isPending, setIsPending] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // handleButtonClick 함수와 fileHandler 함수는 useCallback을 사용하여 불필요한 리렌더링을 방지
  const handleButtonClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (previewImgs.length === 3) {
        alert('이미지 업로드는 3장까지 가능합니다.');
        return;
      }
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    },
    [previewImgs.length],
  ); // previewImgs의 길이에만 의존

  const fileHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files) {
        const newFiles = Array.from(files).filter((file) => {
          // 파일 타입 검사 (이미지 파일만)
          if (!file.type.startsWith('image/')) {
            alert('이미지 파일만 업로드 가능합니다.');
            return false;
          }
          // 중복된 파일이 있는지 확인
          if (previewImgs.some((img) => img.file.name === file.name)) {
            alert(`${file.name} 파일은 이미 업로드되었습니다.`);
            return false;
          }
          return true;
        });

        // 최대 3장까지 업로드 가능
        if (previewImgs.length + newFiles.length <= 3) {
          const newPreviewImgs = newFiles.map((file) => {
            const previewUrl = URL.createObjectURL(file); // 이미지 파일의 blob URL 생성
            return { file, previewUrl };
          });

          setPreviewImgs((prevImgs) => [...prevImgs, ...newPreviewImgs]);
        } else {
          alert('최대 3장까지만 업로드 가능합니다.');
        }
      }
    },
    [previewImgs],
  ); // previewImgs에 의존

  const removeImage = (index: number) => {
    setPreviewImgs((prevImgs) => prevImgs.filter((_, i) => i !== index));
  };

  const uploadImage = async () => {
    if (previewImgs.length > 0) {
      setIsPending(true);
      const formData = new FormData();
      previewImgs.forEach(({ file }) => {
        formData.append('img', file);
      });

      try {
        const result = await fetch('/api/image', {
          method: 'POST',
          body: formData,
        }).then((res) => res.json());

        if (result.status === 'success') {
          return result.data;
        } else {
          alert('이미지 저장에 실패했습니다.');
        }
      } catch (error) {
        alert('서버 오류가 발생했습니다.');
      } finally {
        setIsPending(false);
      }
    }
    setIsPending(false);
  };

  return {
    previewImgs,
    fileInputRef,
    handleButtonClick,
    fileHandler,
    removeImage,
    uploadImage,
    isPending,
  };
};
