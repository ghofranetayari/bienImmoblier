import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const Sidebar = () => {
  return (
    <Box
      sx={{
        width: 250,
        height: '100vh',
        bgcolor: 'background.paper',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        top: 64,
        left: 0,
        padding: 2,
      }}
    >
      <Button variant="contained" color="primary" sx={{ marginBottom: 2 }}>
        Appel
      </Button>
      <Button variant="contained" color="secondary">
        Contact
      </Button>
    </Box>
  );
};

export default Sidebar;
