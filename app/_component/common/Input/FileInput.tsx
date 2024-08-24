import React, { forwardRef } from 'react';

interface FileInputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  multiple: boolean;
}

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
      />
    );
  },
);

FileInput.displayName = 'FileInput';

export default FileInput;
