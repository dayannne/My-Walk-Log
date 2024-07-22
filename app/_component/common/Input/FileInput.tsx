import React, { forwardRef } from 'react';

interface FileInputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  ({ onChange }, ref) => {
    return (
      <input
        ref={ref}
        type='file'
        multiple
        accept='.png, .jpg, .jpeg'
        className='hidden'
        onChange={onChange}
      />
    );
  },
);

FileInput.displayName = 'FileInput';

export default FileInput;
