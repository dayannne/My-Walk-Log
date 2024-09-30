import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Image from 'next/image';

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
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <button
        id='basic-button'
        aria-controls={isOpen ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={isOpen ? 'true' : undefined}
        onClick={handleMenuOpen}
      >
        <Image src='/icons/icon-more.svg' alt='더보기' width={24} height={24} />
      </button>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleMenuClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {firstMenu && (
          <MenuItem
            onClick={() => {
              if (firstMenuClose) firstMenuClose();
              handleMenuClose(); // Close the menu
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
