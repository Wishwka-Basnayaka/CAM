import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Chip,
  Paper,
  InputAdornment,
  Pagination
} from '@mui/material';
import {
  Search as SearchIcon,
  LocationOn as LocationIcon,
  People as PeopleIcon,
  CheckCircle as CheckCircleIcon,
  Event as EventIcon,
  BookOnline as BookOnlineIcon,
  FilterList as FilterIcon
} from '@mui/icons-material';

const UserDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [capacityFilter, setCapacityFilter] = useState('all');
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const resourcesPerPage = 9;

  const resourceTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'room', label: 'Study Room' },
    { value: 'lab', label: 'Computer Lab' },
    { value: 'conference', label: 'Conference Room' },
    { value: 'hall', label: 'Multipurpose Hall' },
    { value: 'auditorium', label: 'Auditorium' }
  ];

  const capacityOptions = [
    { value: 'all', label: 'Any Capacity' },
    { value: 'small', label: 'Small (1-10)' },
    { value: 'medium', label: 'Medium (11-30)' },
    { value: 'large', label: 'Large (31-50)' },
    { value: 'xlarge', label: 'Extra Large (50+)' }
  ];

  useEffect(() => {
    // Simulate fetching resources data
    const fetchResources = async () => {
      // Mock data - in real app, this would come from API
      const mockResources = [
        {
          id: 1,
          name: 'Conference Room A',
          type: 'conference',
          location: 'Building 1, Floor 2',
          capacity: 20,
          status: 'available',
          description: 'Modern conference room with projector and whiteboard'
        },
        {
          id: 2,
          name: 'Computer Lab 2',
          type: 'lab',
          location: 'Building 3, Floor 1',
          capacity: 30,
          status: 'available',
          description: 'Computer lab with 30 workstations'
        },
        {
          id: 3,
          name: 'Study Room 5',
          type: 'room',
          location: 'Library, Floor 3',
          capacity: 6,
          status: 'available',
          description: 'Quiet study room for group work'
        },
        {
          id: 4,
          name: 'Multipurpose Hall',
          type: 'hall',
          location: 'Student Center',
          capacity: 100,
          status: 'maintenance',
          description: 'Large hall for events and gatherings'
        },
        {
          id: 5,
          name: 'Auditorium B',
          type: 'auditorium',
          location: 'Building 2',
          capacity: 200,
          status: 'available',
          description: 'Fully equipped auditorium with AV system'
        },
        {
          id: 6,
          name: 'Study Room 2',
          type: 'room',
          location: 'Library, Floor 2',
          capacity: 4,
          status: 'available',
          description: 'Small study room for individual or group study'
        },
        {
          id: 7,
          name: 'Conference Room C',
          type: 'conference',
          location: 'Building 1, Floor 3',
          capacity: 15,
          status: 'available',
          description: 'Executive conference room with video conferencing'
        },
        {
          id: 8,
          name: 'Computer Lab 1',
          type: 'lab',
          location: 'Building 3, Ground Floor',
          capacity: 25,
          status: 'available',
          description: 'Computer lab with specialized software'
        },
        {
          id: 9,
          name: 'Study Room 8',
          type: 'room',
          location: 'Library, Floor 4',
          capacity: 8,
          status: 'available',
          description: 'Group study room with whiteboard'
        },
        {
          id: 10,
          name: 'Meeting Room D',
          type: 'conference',
          location: 'Building 4, Floor 1',
          capacity: 12,
          status: 'maintenance',
          description: 'Meeting room with presentation equipment'
        },
        {
          id: 11,
          name: 'Computer Lab 3',
          type: 'lab',
          location: 'Building 3, Floor 2',
          capacity: 35,
          status: 'available',
          description: 'Advanced computer lab with high-end workstations'
        },
        {
          id: 12,
          name: 'Study Room 1',
          type: 'room',
          location: 'Library, Floor 1',
          capacity: 5,
          status: 'available',
          description: 'Quiet individual study space'
        }
      ];

      setResources(mockResources);
      setFilteredResources(mockResources);
    };

    fetchResources();
  }, []);

  useEffect(() => {
    // Filter resources based on search and filters
    let filtered = resources;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(resource =>
        resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(resource => resource.type === typeFilter);
    }

    // Apply capacity filter
    if (capacityFilter !== 'all') {
      filtered = filtered.filter(resource => {
        const capacity = resource.capacity;
        switch (capacityFilter) {
          case 'small':
            return capacity >= 1 && capacity <= 10;
          case 'medium':
            return capacity >= 11 && capacity <= 30;
          case 'large':
            return capacity >= 31 && capacity <= 50;
          case 'xlarge':
            return capacity > 50;
          default:
            return true;
        }
      });
    }

    setFilteredResources(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, typeFilter, capacityFilter, resources]);

  const handleViewAvailable = () => {
    // Filter to show only available resources
    const available = resources.filter(resource => resource.status === 'available');
    setFilteredResources(available);
    setCurrentPage(1);
  };

  const handleViewBookings = () => {
    console.log('Navigate to user bookings');
    // This would navigate to the user's bookings page/module
  };

  const handleBookResource = (resourceId) => {
    console.log('Book resource:', resourceId);
    // This would open booking modal or navigate to booking page
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'success';
      case 'maintenance':
        return 'warning';
      case 'booked':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'available':
        return 'Available';
      case 'maintenance':
        return 'Maintenance';
      case 'booked':
        return 'Booked';
      default:
        return 'Unknown';
    }
  };

  const getTypeLabel = (type) => {
    const typeObj = resourceTypes.find(t => t.value === type);
    return typeObj ? typeObj.label : type;
  };

  // Pagination
  const indexOfLastResource = currentPage * resourcesPerPage;
  const indexOfFirstResource = indexOfLastResource - resourcesPerPage;
  const currentResources = filteredResources.slice(indexOfFirstResource, indexOfLastResource);
  const totalPages = Math.ceil(filteredResources.length / resourcesPerPage);

  return (
    <Box sx={{ p: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
        Resource Catalogue
      </Typography>

      {/* Search & Filters Section */}
      <Typography variant="h6" gutterBottom sx={{ mt: 3, mb: 2, color: '#666' }}>
        🔍 Search & Filters
      </Typography>
      <Paper sx={{ p: 3, mb: 4, boxShadow: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Search Resources"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Resource Type</InputLabel>
              <Select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                label="Resource Type"
                startAdornment={<FilterIcon />}
              >
                {resourceTypes.map((type) => (
                  <MenuItem key={type.value} value={type.value}>
                    {type.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Capacity</InputLabel>
              <Select
                value={capacityFilter}
                onChange={(e) => setCapacityFilter(e.target.value)}
                label="Capacity"
              >
                {capacityOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              variant="outlined"
              onClick={() => {
                setSearchTerm('');
                setTypeFilter('all');
                setCapacityFilter('all');
              }}
              fullWidth
              sx={{ py: 2.8 }}
            >
              Clear Filters
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Quick Access Section */}
      <Typography variant="h6" gutterBottom sx={{ mt: 3, mb: 2, color: '#666' }}>
        Quick Access
      </Typography>
      <Paper sx={{ p: 3, mb: 4, boxShadow: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              startIcon={<CheckCircleIcon />}
              onClick={handleViewAvailable}
              fullWidth
              sx={{ py: 2, backgroundColor: '#2e7d32' }}
            >
              View Available Resources
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              startIcon={<BookOnlineIcon />}
              onClick={handleViewBookings}
              fullWidth
              sx={{ py: 2, backgroundColor: '#1976d2' }}
            >
              View My Bookings
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Resource Cards Section */}
      <Typography variant="h6" gutterBottom sx={{ mt: 3, mb: 2, color: '#666' }}>
        📦 Resource Cards ({filteredResources.length} resources found)
      </Typography>
      <Grid container spacing={3}>
        {currentResources.map((resource) => (
          <Grid item xs={12} sm={6} md={4} key={resource.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 3, '&:hover': { boxShadow: 6 } }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                  <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                    {resource.name}
                  </Typography>
                  <Chip
                    label={getStatusText(resource.status)}
                    color={getStatusColor(resource.status)}
                    size="small"
                  />
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {resource.description}
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <Box display="flex" alignItems="center" mb={1}>
                    <LocationIcon sx={{ mr: 1, fontSize: 16, color: '#666' }} />
                    <Typography variant="body2">{resource.location}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" mb={1}>
                    <PeopleIcon sx={{ mr: 1, fontSize: 16, color: '#666' }} />
                    <Typography variant="body2">Capacity: {resource.capacity} people</Typography>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <EventIcon sx={{ mr: 1, fontSize: 16, color: '#666' }} />
                    <Typography variant="body2">{getTypeLabel(resource.type)}</Typography>
                  </Box>
                </Box>

                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => handleBookResource(resource.id)}
                  disabled={resource.status !== 'available'}
                  sx={{ 
                    backgroundColor: resource.status === 'available' ? '#1976d2' : '#ccc',
                    '&:hover': { backgroundColor: resource.status === 'available' ? '#1565c0' : '#ccc' }
                  }}
                >
                  {resource.status === 'available' ? 'Book Now' : 'Unavailable'}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      {totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(event, value) => setCurrentPage(value)}
            color="primary"
            size="large"
          />
        </Box>
      )}

      {filteredResources.length === 0 && (
        <Box textAlign="center" py={8}>
          <Typography variant="h6" color="text.secondary">
            No resources found matching your criteria.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Try adjusting your search or filters.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default UserDashboard;
