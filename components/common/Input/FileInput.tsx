import React, { forwardRef } from 'react';

interface FileInputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  multiple: boolean;
}

const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === 'Enter') {
    e.preventDefault();
  }
};

const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  ({ onChange, multiple }, ref) => {
    return (
      <input
        ref={ref}
        type='file'
        multiple={multiple}
        accept='.png, .jpg, .jpeg'
        className='hidden'
        onChange={onChange}
        onKeyDown={handleKeyDown}
        tabIndex={-1} // 포커스 방지
      />
    );
  },
);

FileInput.displayName = 'FileInput';

export default FileInput;
