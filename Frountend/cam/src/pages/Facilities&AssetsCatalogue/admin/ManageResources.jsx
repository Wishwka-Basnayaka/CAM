import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
  Alert,
  Snackbar,
  Grid,
  Card,
  CardContent,
  CardActions,
  Menu,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
  Settings as SettingsIcon,
  Refresh as RefreshIcon,
  Search as SearchIcon
} from '@mui/icons-material';

const ManageResources = () => {
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const [editFormData, setEditFormData] = useState({
    name: '',
    location: '',
    capacity: '',
    description: '',
    status: ''
  });

  const resourceTypes = ['all', 'room', 'lab', 'conference', 'hall', 'auditorium'];
  const statusOptions = ['available', 'maintenance', 'booked'];

  const filterResources = useCallback(() => {
    let filtered = resources;

    if (searchTerm) {
      filtered = filtered.filter(resource =>
        resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(resource => resource.status === statusFilter);
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter(resource => resource.type === typeFilter);
    }

    setFilteredResources(filtered);
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
      // Mock data
      const mockResources = [
        {
          id: 1,
          name: 'Conference Room A',
          type: 'conference',
          location: 'Building 1, Floor 2',
          capacity: 20,
          status: 'available',
          description: 'Modern conference room with projector and whiteboard',
          equipment: 'Projector, Whiteboard, Video Conference',
          contact: 'Admin Office',
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
          equipment: '30 Computers, Projector, Internet',
          contact: 'IT Department',
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
          equipment: 'Whiteboard, Chairs, Table',
          contact: 'Library Staff',
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
          equipment: 'Sound System, Stage, Chairs',
          contact: 'Student Affairs',
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
          equipment: 'AV System, Projector, Sound System',
          contact: 'Facilities Management',
          createdAt: '2024-01-25',
          lastUpdated: '2024-03-18'
        }
      ];

      setResources(mockResources);
    } catch (error) {
      console.error('Error fetching resources:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMenuClick = (event, resource) => {
    setAnchorEl(event.currentTarget);
    setSelectedResource(resource);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = (resource) => {
    setSelectedResource(resource);
    setEditFormData({
      name: resource.name,
      location: resource.location,
      capacity: resource.capacity,
      description: resource.description,
      status: resource.status
    });
    setEditDialogOpen(true);
    handleMenuClose();
  };

  const handleDelete = (resource) => {
    setSelectedResource(resource);
    setDeleteDialogOpen(true);
    handleMenuClose();
  };

  const handleChangeStatus = (resource) => {
    setSelectedResource(resource);
    setStatusDialogOpen(true);
    handleMenuClose();
  };

  const handleEditSubmit = async () => {
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update resource in state
      setResources(prev => prev.map(resource =>
        resource.id === selectedResource.id
          ? { ...resource, ...editFormData, lastUpdated: new Date().toISOString().split('T')[0] }
          : resource
      ));

      setEditDialogOpen(false);
      showSuccessMessage('Resource updated successfully!');
    } catch (error) {
      console.error('Error updating resource:', error);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Remove resource from state
      setResources(prev => prev.filter(resource => resource.id !== selectedResource.id));

      setDeleteDialogOpen(false);
      showSuccessMessage('Resource deleted successfully!');
    } catch (error) {
      console.error('Error deleting resource:', error);
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update resource status in state
      setResources(prev => prev.map(resource =>
        resource.id === selectedResource.id
          ? { ...resource, status: newStatus, lastUpdated: new Date().toISOString().split('T')[0] }
          : resource
      ));

      setStatusDialogOpen(false);
      showSuccessMessage('Resource status updated successfully!');
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const showSuccessMessage = (message) => {
    setSuccessMessage(message);
    setShowSuccess(true);
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

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
        Manage Resources
      </Typography>

      {/* Filters */}
      <Paper sx={{ p: 3, mb: 3, boxShadow: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon />
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                label="Status"
              >
                <MenuItem value="all">All Status</MenuItem>
                {statusOptions.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                label="Type"
              >
                <MenuItem value="all">All Types</MenuItem>
                {resourceTypes.slice(1).map((type) => (
                  <MenuItem key={type} value={type}>
                    {getTypeLabel(type)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={fetchResources}
              sx={{ py: 2.8 }}
            >
              Refresh
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Resource Cards */}
      <Grid container spacing={3}>
        {filteredResources.map((resource) => (
          <Grid item xs={12} md={6} lg={4} key={resource.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 2 }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {resource.name}
                  </Typography>
                  <IconButton
                    onClick={(e) => handleMenuClick(e, resource)}
                    size="small"
                  >
                    <MoreVertIcon />
                  </IconButton>
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {resource.description}
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Location:</strong> {resource.location}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Capacity:</strong> {resource.capacity} people
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Type:</strong> {getTypeLabel(resource.type)}
                  </Typography>
                </Box>

                <Chip
                  label={resource.status.charAt(0).toUpperCase() + resource.status.slice(1)}
                  color={getStatusColor(resource.status)}
                  size="small"
                />
              </CardContent>

              <CardActions sx={{ p: 2, pt: 0 }}>
                <Button
                  size="small"
                  startIcon={<EditIcon />}
                  onClick={() => handleEdit(resource)}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  startIcon={<SettingsIcon />}
                  onClick={() => handleChangeStatus(resource)}
                >
                  Change Status
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Context Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleEdit(selectedResource)}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit Resource</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleChangeStatus(selectedResource)}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Change Status</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleDelete(selectedResource)} sx={{ color: 'red' }}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" sx={{ color: 'red' }} />
          </ListItemIcon>
          <ListItemText>Delete Resource</ListItemText>
        </MenuItem>
      </Menu>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Edit Resource</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Resource Name"
                value={editFormData.name}
                onChange={(e) => setEditFormData(prev => ({ ...prev, name: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Location"
                value={editFormData.location}
                onChange={(e) => setEditFormData(prev => ({ ...prev, location: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Capacity"
                type="number"
                value={editFormData.capacity}
                onChange={(e) => setEditFormData(prev => ({ ...prev, capacity: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={3}
                value={editFormData.description}
                onChange={(e) => setEditFormData(prev => ({ ...prev, description: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={editFormData.status}
                  onChange={(e) => setEditFormData(prev => ({ ...prev, status: e.target.value }))}
                  label="Status"
                >
                  {statusOptions.map((status) => (
                    <MenuItem key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleEditSubmit} variant="contained">Save Changes</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete "{selectedResource?.name}"? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>

      {/* Status Change Dialog */}
      <Dialog open={statusDialogOpen} onClose={() => setStatusDialogOpen(false)}>
        <DialogTitle>Change Resource Status</DialogTitle>
        <DialogContent>
          <Typography sx={{ mb: 2 }}>
            Select new status for "{selectedResource?.name}":
          </Typography>
          <FormControl fullWidth>
            <Select
              defaultValue={selectedResource?.status}
              onChange={(e) => handleStatusChange(e.target.value)}
            >
              {statusOptions.map((status) => (
                <MenuItem key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setStatusDialogOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* Success Snackbar */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={() => setShowSuccess(false)}>
          {successMessage}
        </Alert>
      </Snackbar>

      {/* Empty State */}
      {filteredResources.length === 0 && !loading && (
        <Box textAlign="center" py={8}>
          <Typography variant="h6" color="text.secondary">
            No resources found
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ManageResources;
