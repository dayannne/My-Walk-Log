import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Image from 'next/image';

interface ConfirmModalProps {
  description: string;
  onConfirm: () => void;
  open: boolean;
  handleClose: () => void;
}

const ConfirmModal = ({
  description,
  onConfirm,
  open,
  handleClose,
}: ConfirmModalProps) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='confirm-dialog-title'
      aria-describedby='confirm-dialog-description'
      className='rounded-full'
    >
      <DialogTitle id='confirm-dialog-title' className='text-base'>
        <Image
          src='/icons/icon-caution.svg'
          alt='리뷰 이미지'
          width={28}
          height={28}
        />
      </DialogTitle>
      <DialogContent className='p-7'>
        <DialogContentText
          className='text-sm text-black'
          id='confirm-dialog-description'
        >
          {description}
        </DialogContentText>
      </DialogContent>
      <div className='flex w-full border-t border-solid border-gray-300'>
        <button
          className='hover:bg-olive-green text-olive-green basis-full border-r border-solid border-gray-300 p-2 text-sm hover:text-white'
          onClick={handleClose}
        >
          취소
        </button>
        <button
          className='hover:bg-olive-green basis-full p-2 text-sm text-gray-500 hover:text-white'
          onClick={() => {
            onConfirm();
            handleClose();
          }}
          autoFocus
        >
          확인
        </button>
      </div>
    </Dialog>
  );
};

export default ConfirmModal;
