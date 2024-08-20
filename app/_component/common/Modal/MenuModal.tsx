import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Image from 'next/image';
import useModal from '@/app/_hooks/useModal';

interface MenuModalProps {
  firstMenu?: string;
  firstMenuClose?: () => void;
  secondMenu?: string;
  secondMenuClose?: () => void;
  thirdMenu?: string;
  thirdMenuClose?: () => void;
}

const MenuModal = ({
  firstMenu,
  firstMenuClose,
  secondMenu,
  secondMenuClose,
  thirdMenu,
  thirdMenuClose,
}: MenuModalProps) => {
  const { open, handleOpen, handleClose } = useModal();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    handleOpen(); // 모달 열기
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleClose(); // 모달 닫기
  };

  return (
    <>
      <button
        id='basic-button'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleMenuOpen}
      >
        <Image src='/icons/icon-more.svg' alt='더보기' width={24} height={24} />
      </button>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {firstMenu && (
          <MenuItem
            onClick={() => {
              if (firstMenuClose) firstMenuClose();
              handleMenuClose();
            }}
            className='text-sm'
          >
            {firstMenu}
          </MenuItem>
        )}
        {secondMenu && (
          <MenuItem
            onClick={() => {
              if (secondMenuClose) secondMenuClose();
              handleMenuClose();
            }}
            className='text-sm'
          >
            {secondMenu}
          </MenuItem>
        )}
        {thirdMenu && (
          <MenuItem
            onClick={() => {
              if (thirdMenuClose) thirdMenuClose();
              handleMenuClose();
            }}
            className='text-sm'
          >
            {thirdMenu}
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default MenuModal;
