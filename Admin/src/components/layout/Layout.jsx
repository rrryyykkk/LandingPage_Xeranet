import { Box, CssBaseline } from '@mui/material';
import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <CssBaseline />
      <Header onSidebarToggle={handleSidebarToggle} />
      <Sidebar open={sidebarOpen} />
      <Box 
        sx={{ 
          flexGrow: 1,
          width: '100%',
          transition: 'margin 0.2s ease-in-out',
          marginLeft: sidebarOpen ? '240px' : 0,
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Box
          component="main"
          sx={{
            p: 3,
            mt: 8,
            minHeight: 'calc(100vh - 64px)',
            width: '100%',
            maxWidth: '1200px',
            boxSizing: 'border-box',
            overflow: 'auto',
            mx: 'auto'
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout; 