import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Divider,
  Alert,
  Snackbar,
  IconButton
} from '@mui/material';
import {
  Save as SaveIcon,
  Cancel as CancelIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const AddResource = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    location: '',
    capacity: '',
    description: '',
    status: 'available'
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const resourceTypes = [
    { value: 'room', label: 'Study Room' },
    { value: 'lab', label: 'Computer Lab' },
    { value: 'conference', label: 'Conference Room' },
    { value: 'hall', label: 'Multipurpose Hall' },
    { value: 'auditorium', label: 'Auditorium' }
  ];

  const statusOptions = [
    { value: 'available', label: 'Available' },
    { value: 'maintenance', label: 'Maintenance' },
    { value: 'booked', label: 'Booked' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Resource name is required';
    }

    if (!formData.type) {
      newErrors.type = 'Resource type is required';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    if (!formData.capacity || formData.capacity < 1) {
      newErrors.capacity = 'Capacity must be at least 1';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.status) {
      newErrors.status = 'Status is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Mock API call - in real app, this would be an actual API request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('New resource data:', formData);
      
      // Show success message
      setShowSuccess(true);
      
      // Redirect to view resources after 2 seconds
      setTimeout(() => {
        navigate('/resources');
      }, 2000);
      
    } catch (error) {
      console.error('Error creating resource:', error);
      // Handle error (show error message)
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/resources');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box display="flex" alignItems="center" mb={3}>
        <IconButton onClick={handleGoBack} sx={{ mr: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333' }}>
          Add New Resource
        </Typography>
      </Box>

      <Paper sx={{ p: 4, boxShadow: 2 }}>
        <form onSubmit={handleSubmit}>
          <Typography variant="h6" gutterBottom sx={{ color: '#666' }}>
            Resource Information
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={3}>
            {/* Resource Name */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Resource Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
                required
                placeholder="e.g., Conference Room A"
              />
            </Grid>

            {/* Resource Type */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth error={!!errors.type}>
                <InputLabel>Resource Type *</InputLabel>
                <Select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  label="Resource Type *"
                >
                  {resourceTypes.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
                </Select>
                {errors.type && (
                  <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2 }}>
                    {errors.type}
                  </Typography>
                )}
              </FormControl>
            </Grid>

            {/* Location */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                error={!!errors.location}
                helperText={errors.location}
                required
                placeholder="e.g., Building 1, Floor 2"
              />
            </Grid>

            {/* Capacity */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Capacity"
                name="capacity"
                type="number"
                value={formData.capacity}
                onChange={handleChange}
                error={!!errors.capacity}
                helperText={errors.capacity}
                required
                inputProps={{ min: 1, max: 500 }}
                placeholder="Number of people"
              />
            </Grid>

            {/* Status */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth error={!!errors.status}>
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  label="Status"
                >
                  {statusOptions.map((status) => (
                    <MenuItem key={status.value} value={status.value}>
                      {status.label}
                    </MenuItem>
                  ))}
                </Select>
                {errors.status && (
                  <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2 }}>
                    {errors.status}
                  </Typography>
                )}
              </FormControl>
            </Grid>

            {/* Description */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                error={!!errors.description}
                helperText={errors.description}
                required
                multiline
                rows={4}
                placeholder="Provide a detailed description of the resource, including equipment and features"
              />
            </Grid>
          </Grid>

          {/* Additional Information Section */}
          <Typography variant="h6" gutterBottom sx={{ mt: 4, mb: 2, color: '#666' }}>
            Additional Information (Optional)
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Equipment Available"
                name="equipment"
                value={formData.equipment || ''}
                onChange={handleChange}
                placeholder="e.g., Projector, Whiteboard, Computer Lab"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Contact Person"
                name="contact"
                value={formData.contact || ''}
                onChange={handleChange}
                placeholder="Person responsible for this resource"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Special Requirements"
                name="requirements"
                value={formData.requirements || ''}
                onChange={handleChange}
                multiline
                rows={2}
                placeholder="Any special requirements or restrictions for using this resource"
              />
            </Grid>
          </Grid>

          {/* Action Buttons */}
          <Divider sx={{ my: 4 }} />
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Button
              variant="outlined"
              startIcon={<CancelIcon />}
              onClick={handleCancel}
              sx={{ minWidth: 120 }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              startIcon={<SaveIcon />}
              disabled={isSubmitting}
              sx={{ minWidth: 120, backgroundColor: '#1976d2' }}
            >
              {isSubmitting ? 'Saving...' : 'Save Resource'}
            </Button>
          </Box>
        </form>
      </Paper>

      {/* Success Snackbar */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={() => setShowSuccess(false)}>
          Resource created successfully! Redirecting...
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddResource;
