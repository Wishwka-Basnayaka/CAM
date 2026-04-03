import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Dashboard from './pages/Facilities&AssetsCatalogue/dashboard';
import ViewResources from './pages/Facilities&AssetsCatalogue/admin/ViewResources';
import AddResource from './pages/Facilities&AssetsCatalogue/admin/AddResource';
import ManageResources from './pages/Facilities&AssetsCatalogue/admin/ManageResources';
import Analytics from './pages/Facilities&AssetsCatalogue/admin/Analytics';
import ProtectedAdminRoute from './components/Facilities&AssetsCatalog/ProtectedAdminRoute';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f57c00',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/resources" element={<ProtectedAdminRoute><ViewResources /></ProtectedAdminRoute>} />
        <Route path="/resources/create" element={<ProtectedAdminRoute><AddResource /></ProtectedAdminRoute>} />
        <Route path="/admin/resources" element={<ProtectedAdminRoute><ManageResources /></ProtectedAdminRoute>} />
        <Route path="/analytics" element={<ProtectedAdminRoute><Analytics /></ProtectedAdminRoute>} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
