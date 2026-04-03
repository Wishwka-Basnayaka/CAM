import React, { useState } from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import AdminSidebar from './AdminSidebar';
import { useLocation } from 'react-router-dom';

const drawerWidth = 280;

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  // Auto-close sidebar on mobile when route changes
  React.useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [location, isMobile]);

  return (
    <Box sx={{ display: 'flex' }}>
      <AdminSidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: sidebarOpen ? 0 : `-${drawerWidth}px` },
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          ...(sidebarOpen && {
            transition: theme.transitions.create(['margin', 'width'], {
              easing: theme.transitions.easing.easeOut,
              duration: theme.transitions.duration.enteringScreen,
            }),
          }),
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout;
