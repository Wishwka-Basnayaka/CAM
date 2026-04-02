import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  Avatar,
  IconButton,
  Fab
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  TrendingUp as TrendingUpIcon,
  Business as BusinessIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon
} from '@mui/icons-material';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalResources: 0,
    activeResources: 0,
    outOfService: 0
  });

  const [mostUsedResources, setMostUsedResources] = useState([]);
  const [usageTrends, setUsageTrends] = useState([]);

  useEffect(() => {
    // Simulate fetching dashboard data
    const fetchDashboardData = async () => {
      // Mock data - in real app, this would come from API
      setStats({
        totalResources: 45,
        activeResources: 38,
        outOfService: 7
      });

      setMostUsedResources([
        { name: 'Conference Room A', usage: 156, location: 'Building 1' },
        { name: 'Computer Lab 2', usage: 134, location: 'Building 3' },
        { name: 'Study Room 5', usage: 98, location: 'Library' },
        { name: 'Multipurpose Hall', usage: 87, location: 'Student Center' }
      ]);

      setUsageTrends([
        { month: 'Jan', bookings: 234 },
        { month: 'Feb', bookings: 267 },
        { month: 'Mar', bookings: 312 },
        { month: 'Apr', bookings: 298 },
        { month: 'May', bookings: 345 },
        { month: 'Jun', bookings: 389 }
      ]);
    };

    fetchDashboardData();
  }, []);

  const handleAddResource = () => {
    console.log('Add new resource');
    // Navigate to add resource form or open modal
  };

  const handleEditResource = () => {
    console.log('Edit resource');
    // Navigate to edit resource page
  };

  const handleDeleteResource = () => {
    console.log('Delete resource');
    // Open delete confirmation dialog
  };

  return (
    <Box sx={{ p: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
        Admin Dashboard
      </Typography>

      {/* Summary Cards Section */}
      <Typography variant="h6" gutterBottom sx={{ mt: 3, mb: 2, color: '#666' }}>
        📊 Summary Cards
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ backgroundColor: '#1976d2', color: 'white', boxShadow: 3 }}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h6" component="div">
                    Total Resources
                  </Typography>
                  <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                    {stats.totalResources}
                  </Typography>
                </Box>
                <Avatar sx={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                  <BusinessIcon />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ backgroundColor: '#2e7d32', color: 'white', boxShadow: 3 }}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h6" component="div">
                    Active Resources
                  </Typography>
                  <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                    {stats.activeResources}
                  </Typography>
                </Box>
                <Avatar sx={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                  <CheckCircleIcon />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ backgroundColor: '#d32f2f', color: 'white', boxShadow: 3 }}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h6" component="div">
                    Out of Service
                  </Typography>
                  <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                    {stats.outOfService}
                  </Typography>
                </Box>
                <Avatar sx={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                  <ErrorIcon />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Quick Actions Section */}
      <Typography variant="h6" gutterBottom sx={{ mt: 3, mb: 2, color: '#666' }}>
        ⚡ Quick Actions
      </Typography>
      <Paper sx={{ p: 3, mb: 4, boxShadow: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddResource}
              fullWidth
              sx={{ py: 2, backgroundColor: '#1976d2' }}
            >
              Add Resource
            </Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              onClick={handleEditResource}
              fullWidth
              sx={{ py: 2, backgroundColor: '#f57c00' }}
            >
              Edit Resource
            </Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              variant="contained"
              startIcon={<DeleteIcon />}
              onClick={handleDeleteResource}
              fullWidth
              sx={{ py: 2, backgroundColor: '#d32f2f' }}
            >
              Delete Resource
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Analytics Section */}
      <Typography variant="h6" gutterBottom sx={{ mt: 3, mb: 2, color: '#666' }}>
        📈 Analytics
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, boxShadow: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <TrendingUpIcon sx={{ mr: 1, color: '#1976d2' }} />
              Most Used Resources
            </Typography>
            <List>
              {mostUsedResources.map((resource, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemText
                      primary={resource.name}
                      secondary={`${resource.location} • ${resource.usage} bookings`}
                    />
                    <Chip
                      label={`#${index + 1}`}
                      color="primary"
                      size="small"
                      sx={{ mr: 1 }}
                    />
                    <Chip
                      label={`${resource.usage} uses`}
                      variant="outlined"
                      size="small"
                    />
                  </ListItem>
                  {index < mostUsedResources.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, boxShadow: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <TrendingUpIcon sx={{ mr: 1, color: '#2e7d32' }} />
              Usage Trends
            </Typography>
            <Box sx={{ mt: 2 }}>
              {usageTrends.map((trend, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      {trend.month}
                    </Typography>
                    <Typography variant="body2" color="primary">
                      {trend.bookings} bookings
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: '100%',
                      backgroundColor: '#e0e0e0',
                      borderRadius: 1,
                      height: 8,
                      mt: 1
                    }}
                  >
                    <Box
                      sx={{
                        width: `${(trend.bookings / 400) * 100}%`,
                        backgroundColor: '#1976d2',
                        height: '100%',
                        borderRadius: 1
                      }}
                    />
                  </Box>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Floating Action Button for quick add */}
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          backgroundColor: '#1976d2'
        }}
        onClick={handleAddResource}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
};

export default AdminDashboard;
