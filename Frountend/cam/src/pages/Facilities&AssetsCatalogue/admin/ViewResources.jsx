import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  Pagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip
} from '@mui/material';
import {
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';

const ViewResources = () => {
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const resourcesPerPage = 10;
  const resourceTypes = ['all', 'room', 'lab', 'conference', 'hall', 'auditorium'];
  const statusOptions = ['all', 'available', 'maintenance', 'booked'];

  const filterResources = useCallback(() => {
    let filtered = resources;

    if (searchTerm) {
      filtered = filtered.filter(resource =>
        resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(resource => resource.status === statusFilter);
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter(resource => resource.type === typeFilter);
    }

    setFilteredResources(filtered);
    setCurrentPage(1);
  }, [resources, searchTerm, statusFilter, typeFilter]);

  useEffect(() => {
    fetchResources();
  }, []);

  useEffect(() => {
    filterResources();
  }, [filterResources]);

  const fetchResources = async () => {
    setLoading(true);
    try {
      // Mock data - in real app, this would come from API
      const mockResources = [
        {
          id: 1,
          name: 'Conference Room A',
          type: 'conference',
          location: 'Building 1, Floor 2',
          capacity: 20,
          status: 'available',
          description: 'Modern conference room with projector and whiteboard',
          createdAt: '2024-01-15',
          lastUpdated: '2024-03-10'
        },
        {
          id: 2,
          name: 'Computer Lab 2',
          type: 'lab',
          location: 'Building 3, Floor 1',
          capacity: 30,
          status: 'available',
          description: 'Computer lab with 30 workstations',
          createdAt: '2024-01-20',
          lastUpdated: '2024-03-15'
        },
        {
          id: 3,
          name: 'Study Room 5',
          type: 'room',
          location: 'Library, Floor 3',
          capacity: 6,
          status: 'maintenance',
          description: 'Quiet study room for group work',
          createdAt: '2024-02-01',
          lastUpdated: '2024-03-20'
        },
        {
          id: 4,
          name: 'Multipurpose Hall',
          type: 'hall',
          location: 'Student Center',
          capacity: 100,
          status: 'available',
          description: 'Large hall for events and gatherings',
          createdAt: '2024-01-10',
          lastUpdated: '2024-03-05'
        },
        {
          id: 5,
          name: 'Auditorium B',
          type: 'auditorium',
          location: 'Building 2',
          capacity: 200,
          status: 'booked',
          description: 'Fully equipped auditorium with AV system',
          createdAt: '2024-01-25',
          lastUpdated: '2024-03-18'
        },
        {
          id: 6,
          name: 'Meeting Room D',
          type: 'conference',
          location: 'Building 4, Floor 1',
          capacity: 12,
          status: 'available',
          description: 'Meeting room with presentation equipment',
          createdAt: '2024-02-10',
          lastUpdated: '2024-03-12'
        },
        {
          id: 7,
          name: 'Computer Lab 3',
          type: 'lab',
          location: 'Building 3, Floor 2',
          capacity: 35,
          status: 'maintenance',
          description: 'Advanced computer lab with high-end workstations',
          createdAt: '2024-02-15',
          lastUpdated: '2024-03-22'
        },
        {
          id: 8,
          name: 'Study Room 1',
          type: 'room',
          location: 'Library, Floor 1',
          capacity: 5,
          status: 'available',
          description: 'Quiet individual study space',
          createdAt: '2024-01-30',
          lastUpdated: '2024-03-08'
        }
      ];

      setResources(mockResources);
    } catch (error) {
      console.error('Error fetching resources:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (resourceId) => {
    console.log('Edit resource:', resourceId);
    // Navigate to edit page
  };

  const handleDelete = (resourceId) => {
    console.log('Delete resource:', resourceId);
    // Open delete confirmation dialog
  };

  const handleView = (resourceId) => {
    console.log('View resource details:', resourceId);
    // Open view details modal
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

  const getTypeLabel = (type) => {
    const labels = {
      room: 'Study Room',
      lab: 'Computer Lab',
      conference: 'Conference Room',
      hall: 'Multipurpose Hall',
      auditorium: 'Auditorium'
    };
    return labels[type] || type;
  };

  // Pagination
  const indexOfLastResource = currentPage * resourcesPerPage;
  const indexOfFirstResource = indexOfLastResource - resourcesPerPage;
  const currentResources = filteredResources.slice(indexOfFirstResource, indexOfLastResource);
  const totalPages = Math.ceil(filteredResources.length / resourcesPerPage);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
        View Resources
      </Typography>

      {/* Filters and Search */}
      <Paper sx={{ p: 3, mb: 3, boxShadow: 2 }}>
        <Box display="flex" gap={2} alignItems="center" flexWrap="wrap">
          <TextField
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 250, flexGrow: 1 }}
          />
          
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              label="Status"
            >
              {statusOptions.map((status) => (
                <MenuItem key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Type</InputLabel>
            <Select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              label="Type"
            >
              {resourceTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type === 'all' ? 'All Types' : getTypeLabel(type)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={fetchResources}
            sx={{ minWidth: 120 }}
          >
            Refresh
          </Button>
        </Box>
      </Paper>

      {/* Resources Table */}
      <Paper sx={{ boxShadow: 2 }}>
        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Type</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Location</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Capacity</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Last Updated</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentResources.map((resource) => (
                <TableRow key={resource.id} hover>
                  <TableCell>{resource.id}</TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                      {resource.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {resource.description}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={getTypeLabel(resource.type)}
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{resource.location}</TableCell>
                  <TableCell>{resource.capacity}</TableCell>
                  <TableCell>
                    <Chip
                      label={resource.status.charAt(0).toUpperCase() + resource.status.slice(1)}
                      color={getStatusColor(resource.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{resource.lastUpdated}</TableCell>
                  <TableCell>
                    <Box display="flex" gap={1}>
                      <Tooltip title="View Details">
                        <IconButton
                          size="small"
                          onClick={() => handleView(resource.id)}
                          sx={{ color: '#1976d2' }}
                        >
                          <ViewIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <IconButton
                          size="small"
                          onClick={() => handleEdit(resource.id)}
                          sx={{ color: '#f57c00' }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(resource.id)}
                          sx={{ color: '#d32f2f' }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        {totalPages > 1 && (
          <Box display="flex" justifyContent="center" p={2}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(event, value) => setCurrentPage(value)}
              color="primary"
            />
          </Box>
        )}

        {/* Empty State */}
        {filteredResources.length === 0 && !loading && (
          <Box textAlign="center" py={8}>
            <Typography variant="h6" color="text.secondary">
              No resources found
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Try adjusting your search or filters
            </Typography>
          </Box>
        )}
      </Paper>

      {/* Summary */}
      <Paper sx={{ p: 2, mt: 3, backgroundColor: '#f8f9fa' }}>
        <Typography variant="body2" color="text.secondary">
          Showing {currentResources.length} of {filteredResources.length} resources
        </Typography>
      </Paper>
    </Box>
  );
};

export default ViewResources;
