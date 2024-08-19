'use client';

import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { StyledEngineProvider } from '@mui/material';

const MaterialProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = createTheme({
    typography: {
      fontFamily: 'Noto Sans KR, sans-serif',
      fontSize: 14,
    },
    // 추가적인 테마 설정...
  });

  return (
    <>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children as any}
        </ThemeProvider>
      </StyledEngineProvider>
    </>
  );
};

export default MaterialProvider;
