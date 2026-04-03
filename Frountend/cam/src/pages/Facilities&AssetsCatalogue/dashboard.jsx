import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Button, Typography, Paper } from '@mui/material';
import { AdminPanelSettings as AdminIcon, Person as UserIcon } from '@mui/icons-material';
import AdminDashboard from './admin/AdminDashboard';
import UserDashboard from './user/UserDashboard';

const Dashboard = () => {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching user role from authentication context or API
    const fetchUserRole = async () => {
      try {
        // In a real app, this would come from your auth context or API
        // For demo purposes, we'll simulate it
        const storedRole = localStorage.getItem('userRole') || 'USER';
        setUserRole(storedRole.toUpperCase());
      } catch (error) {
        console.error('Error fetching user role:', error);
        setUserRole('USER'); // Default to USER role
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, []);

  const handleRoleSwitch = (role) => {
    setUserRole(role);
    localStorage.setItem('userRole', role);
  };

  const handleAdminTest = () => {
    handleRoleSwitch('ADMIN');
  };

  const handleUserTest = () => {
    handleRoleSwitch('USER');
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', minHeight: '100vh' }}>
      {/* Role Switcher */}
      <Paper sx={{ p: 2, mb: 3, backgroundColor: '#f8f9fa', boxShadow: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" sx={{ color: '#666' }}>
            Current Role: <strong>{userRole || 'USER'}</strong>
          </Typography>
          <Box display="flex" gap={2}>
            <Button
              variant="contained"
              startIcon={<AdminIcon />}
              onClick={handleAdminTest}
              sx={{ backgroundColor: userRole === 'ADMIN' ? '#1976d2' : '#e0e0e0', color: 'white' }}
            >
              Admin Dashboard
            </Button>
            <Button
              variant="contained"
              startIcon={<UserIcon />}
              onClick={handleUserTest}
              sx={{ backgroundColor: userRole === 'USER' ? '#2e7d32' : '#e0e0e0', color: 'white' }}
            >
              User Dashboard
            </Button>
          </Box>
        </Box>
      </Paper>
      
      {userRole === 'ADMIN' ? (
        <AdminDashboard />
      ) : (
        <UserDashboard />
      )}
    </Box>
  );
};

export default Dashboard;