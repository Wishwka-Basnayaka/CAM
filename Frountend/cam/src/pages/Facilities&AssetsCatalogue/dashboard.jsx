import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
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
      {userRole === 'ADMIN' ? (
        <AdminDashboard />
      ) : (
        <UserDashboard />
      )}
    </Box>
  );
};

export default Dashboard;