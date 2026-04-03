import React from 'react';
import { Navigate } from 'react-router-dom';
import AdminLayout from './AdminLayout';

const ProtectedAdminRoute = ({ children }) => {
  // Check if user is admin
  const userRole = localStorage.getItem('userRole')?.toUpperCase();
  
  if (userRole !== 'ADMIN') {
    // Redirect to main dashboard if not admin
    return <Navigate to="/dashboard" replace />;
  }

  return <AdminLayout>{children}</AdminLayout>;
};

export default ProtectedAdminRoute;
