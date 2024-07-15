'use client';

import React from 'react';
import { ThemeProvider } from '@material-tailwind/react';
import CssBaseline from '@mui/material/CssBaseline';
import { StyledEngineProvider } from '@mui/material';

const MaterialProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <StyledEngineProvider injectFirst>
        <ThemeProvider>
          <CssBaseline />
          {children as any}
        </ThemeProvider>
      </StyledEngineProvider>
    </>
  );
};

export default MaterialProvider;
