import React, { useState } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Inventory as ResourceIcon,
  AddCircle as AddIcon,
  Edit as EditIcon,
  Analytics as AnalyticsIcon,
  Build as MaintenanceIcon,
  CalendarMonth as BookingsIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 280;

const menuItems = [
  {
    text: 'Dashboard',
    icon: <DashboardIcon />,
    path: '/dashboard'
  },
  {
    text: 'Resource Management',
    icon: <ResourceIcon />,
    children: [
      {
        text: 'View Resources',
        icon: <ResourceIcon />,
        path: '/resources'
      },
      {
        text: 'Add Resource',
        icon: <AddIcon />,
        path: '/resources/create'
      },
      {
        text: 'Manage Resources',
        icon: <EditIcon />,
        path: '/admin/resources'
      }
    ]
  },
  {
    text: 'Analytics',
    icon: <AnalyticsIcon />,
    path: '/analytics'
  },
  {
    text: 'Maintenance',
    icon: <MaintenanceIcon />,
    path: '/maintenance',
    disabled: true,
    badge: 'Future'
  },
  {
    text: 'Bookings',
    icon: <BookingsIcon />,
    path: '/bookings',
    disabled: true,
    badge: 'Future'
  },
  {
    text: 'Logout',
    icon: <LogoutIcon />,
    path: '/logout'
  }
];

const AdminSidebar = ({ open, setOpen }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState(['Resource Management']);

  const handleItemClick = (item) => {
    if (item.children) {
      setExpandedItems(prev =>
        prev.includes(item.text)
          ? prev.filter(i => i !== item.text)
          : [...prev, item.text]
      );
    } else if (item.path === '/logout') {
      // Handle logout
      localStorage.removeItem('userRole');
      navigate('/dashboard');
    } else {
      navigate(item.path);
      if (isMobile) {
        setOpen(false);
      }
    }
  };

  const handleChildClick = (path) => {
    navigate(path);
    if (isMobile) {
      setOpen(false);
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const drawerContent = (
    <Box sx={{ height: '100%', backgroundColor: '#1a237e' }}>
      {/* Header */}
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
          Admin Panel
        </Typography>
        {isMobile && (
          <IconButton onClick={() => setOpen(false)} sx={{ color: 'white' }}>
            <ChevronLeftIcon />
          </IconButton>
        )}
      </Box>
      <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.2)' }} />

      {/* Menu Items */}
      <List sx={{ p: 2 }}>
        {menuItems.map((item, index) => (
          <Box key={index}>
            <ListItem disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => handleItemClick(item)}
                disabled={item.disabled}
                sx={{
                  borderRadius: 2,
                  backgroundColor: isActive(item.path) ? 'rgba(255,255,255,0.1)' : 'transparent',
                  color: item.disabled ? 'rgba(255,255,255,0.5)' : 'white',
                  '&:hover': {
                    backgroundColor: item.disabled ? 'transparent' : 'rgba(255,255,255,0.1)',
                  },
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(255,255,255,0.2)',
                  }
                }}
              >
                <ListItemIcon sx={{ color: item.disabled ? 'rgba(255,255,255,0.5)' : 'white', minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontSize: '0.9rem',
                    fontWeight: isActive(item.path) ? 'bold' : 'normal'
                  }}
                />
                {item.badge && (
                  <Box
                    component="span"
                    sx={{
                      backgroundColor: '#ff6b6b',
                      color: 'white',
                      fontSize: '0.7rem',
                      padding: '2px 8px',
                      borderRadius: '12px',
                      marginLeft: 1
                    }}
                  >
                    {item.badge}
                  </Box>
                )}
              </ListItemButton>
            </ListItem>

            {/* Submenu for Resource Management */}
            {item.children && expandedItems.includes(item.text) && (
              <Box sx={{ ml: 3, mt: 1 }}>
                {item.children.map((child, childIndex) => (
                  <ListItem disablePadding key={childIndex} sx={{ mb: 0.5 }}>
                    <ListItemButton
                      onClick={() => handleChildClick(child.path)}
                      sx={{
                        borderRadius: 1,
                        backgroundColor: isActive(child.path) ? 'rgba(255,255,255,0.15)' : 'transparent',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: 'rgba(255,255,255,0.1)',
                        }
                      }}
                    >
                      <ListItemIcon sx={{ color: 'white', minWidth: 32 }}>
                        {child.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={child.text}
                        primaryTypographyProps={{
                          fontSize: '0.85rem'
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </Box>
            )}
          </Box>
        ))}
      </List>

      {/* Footer */}
      <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, p: 2 }}>
        <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.2)', mb: 2 }} />
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', textAlign: 'center' }}>
          CAM System v1.0
        </Typography>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Mobile menu button */}
      {isMobile && (
        <IconButton
          onClick={() => setOpen(true)}
          sx={{
            position: 'fixed',
            top: 16,
            left: 16,
            zIndex: 1300,
            backgroundColor: '#1a237e',
            color: 'white',
            '&:hover': {
              backgroundColor: '#283593',
            }
          }}
        >
          <MenuIcon />
        </IconButton>
      )}

      {/* Sidebar */}
      <Drawer
        variant={isMobile ? 'temporary' : 'persistent'}
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            borderRight: 'none',
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default AdminSidebar;
