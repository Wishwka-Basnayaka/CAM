import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  LinearProgress,
  Avatar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Assessment as AssessmentIcon,
  Timeline as TimelineIcon,
  PieChart as PieChartIcon,
  BarChart as BarChartIcon,
  Download as DownloadIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [loading, setLoading] = useState(false);
  const [analyticsData, setAnalyticsData] = useState({
    overview: {
      totalBookings: 0,
      activeUsers: 0,
      utilizationRate: 0,
      growthRate: 0
    },
    mostUsedResources: [],
    usageTrends: [],
    resourceTypeStats: [],
    monthlyStats: []
  });

  const timeRanges = [
    { value: 'week', label: 'Last Week' },
    { value: 'month', label: 'Last Month' },
    { value: 'quarter', label: 'Last Quarter' },
    { value: 'year', label: 'Last Year' }
  ];

  useEffect(() => {
    fetchAnalyticsData();
  }, [timeRange]);

  const fetchAnalyticsData = async () => {
    setLoading(true);
    try {
      // Mock API call - in real app, this would fetch from backend
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockData = {
        overview: {
          totalBookings: 1247,
          activeUsers: 342,
          utilizationRate: 78.5,
          growthRate: 12.3
        },
        mostUsedResources: [
          {
            id: 1,
            name: 'Conference Room A',
            type: 'conference',
            totalBookings: 156,
            averageDuration: 2.5,
            utilizationRate: 85.2,
            trend: 'up'
          },
          {
            id: 2,
            name: 'Computer Lab 2',
            type: 'lab',
            totalBookings: 134,
            averageDuration: 3.2,
            utilizationRate: 78.9,
            trend: 'up'
          },
          {
            id: 3,
            name: 'Study Room 5',
            type: 'room',
            totalBookings: 98,
            averageDuration: 1.8,
            utilizationRate: 72.4,
            trend: 'down'
          },
          {
            id: 4,
            name: 'Multipurpose Hall',
            type: 'hall',
            totalBookings: 87,
            averageDuration: 4.1,
            utilizationRate: 68.7,
            trend: 'up'
          },
          {
            id: 5,
            name: 'Auditorium B',
            type: 'auditorium',
            totalBookings: 45,
            averageDuration: 2.8,
            utilizationRate: 56.3,
            trend: 'up'
          }
        ],
        usageTrends: [
          { month: 'Jan', bookings: 234, users: 189 },
          { month: 'Feb', bookings: 267, users: 201 },
          { month: 'Mar', bookings: 312, users: 234 },
          { month: 'Apr', bookings: 298, users: 226 },
          { month: 'May', bookings: 345, users: 267 },
          { month: 'Jun', bookings: 389, users: 298 }
        ],
        resourceTypeStats: [
          { type: 'Conference Rooms', count: 8, utilization: 82.3, bookings: 234 },
          { type: 'Computer Labs', count: 6, utilization: 76.8, bookings: 189 },
          { type: 'Study Rooms', count: 12, utilization: 71.2, bookings: 156 },
          { type: 'Multipurpose Halls', count: 3, utilization: 68.5, bookings: 87 },
          { type: 'Auditoriums', count: 2, utilization: 54.2, bookings: 45 }
        ],
        monthlyStats: [
          { metric: 'Peak Usage Time', value: '2:00 PM - 4:00 PM' },
          { metric: 'Most Active Day', value: 'Tuesday' },
          { metric: 'Average Booking Duration', value: '2.8 hours' },
          { metric: 'Cancellation Rate', value: '8.4%' }
        ]
      };

      setAnalyticsData(mockData);
    } catch (error) {
      console.error('Error fetching analytics data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    console.log('Export analytics data');
    // Implement export functionality
  };

  const getStatusColor = (trend) => {
    return trend === 'up' ? 'success' : 'error';
  };

  const getTrendIcon = (trend) => {
    return trend === 'up' ? <TrendingUpIcon /> : <TrendingDownIcon />;
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'conference':
        return '🏢';
      case 'lab':
        return '💻';
      case 'room':
        return '📚';
      case 'hall':
        return '🎭';
      case 'auditorium':
        return '🎪';
      default:
        return '📦';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333' }}>
          Analytics Dashboard
        </Typography>
        <Box display="flex" gap={2}>
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Time Range</InputLabel>
            <Select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              label="Time Range"
            >
              {timeRanges.map((range) => (
                <MenuItem key={range.value} value={range.value}>
                  {range.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={fetchAnalyticsData}
            disabled={loading}
          >
            Refresh
          </Button>
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={handleExport}
          >
            Export
          </Button>
        </Box>
      </Box>

      {/* Overview Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: '#1976d2', color: 'white', boxShadow: 3 }}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Total Bookings
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    {analyticsData.overview.totalBookings.toLocaleString()}
                  </Typography>
                  <Box display="flex" alignItems="center" mt={1}>
                    <TrendingUpIcon fontSize="small" />
                    <Typography variant="body2" sx={{ ml: 0.5 }}>
                      +{analyticsData.overview.growthRate}%
                    </Typography>
                  </Box>
                </Box>
                <Avatar sx={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                  <AssessmentIcon />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: '#2e7d32', color: 'white', boxShadow: 3 }}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Active Users
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    {analyticsData.overview.activeUsers}
                  </Typography>
                  <Box display="flex" alignItems="center" mt={1}>
                    <TrendingUpIcon fontSize="small" />
                    <Typography variant="body2" sx={{ ml: 0.5 }}>
                      +8.2%
                    </Typography>
                  </Box>
                </Box>
                <Avatar sx={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                  <TimelineIcon />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: '#f57c00', color: 'white', boxShadow: 3 }}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Utilization Rate
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    {analyticsData.overview.utilizationRate}%
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={analyticsData.overview.utilizationRate}
                    sx={{
                      mt: 1,
                      backgroundColor: 'rgba(255,255,255,0.3)',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: 'white'
                      }
                    }}
                  />
                </Box>
                <Avatar sx={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                  <PieChartIcon />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: '#7b1fa2', color: 'white', boxShadow: 3 }}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Growth Rate
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    +{analyticsData.overview.growthRate}%
                  </Typography>
                  <Box display="flex" alignItems="center" mt={1}>
                    <TrendingUpIcon fontSize="small" />
                    <Typography variant="body2" sx={{ ml: 0.5 }}>
                      vs last period
                    </Typography>
                  </Box>
                </Box>
                <Avatar sx={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                  <BarChartIcon />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Most Used Resources */}
        <Grid item xs={12} lg={8}>
          <Paper sx={{ p: 3, boxShadow: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Most Used Resources
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Resource</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell align="center">Total Bookings</TableCell>
                    <TableCell align="center">Avg Duration</TableCell>
                    <TableCell align="center">Utilization</TableCell>
                    <TableCell align="center">Trend</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {analyticsData.mostUsedResources.map((resource, index) => (
                    <TableRow key={resource.id} hover>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <Typography sx={{ mr: 1, fontSize: '1.2rem' }}>
                            {getTypeIcon(resource.type)}
                          </Typography>
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                              {resource.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              #{index + 1}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                          variant="outlined"
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                          {resource.totalBookings}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        {resource.averageDuration}h
                      </TableCell>
                      <TableCell align="center">
                        <Box display="flex" alignItems="center" justifyContent="center">
                          <Typography variant="body2" sx={{ mr: 1 }}>
                            {resource.utilizationRate}%
                          </Typography>
                          <LinearProgress
                            variant="determinate"
                            value={resource.utilizationRate}
                            sx={{ width: 50 }}
                          />
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          icon={getTrendIcon(resource.trend)}
                          label={resource.trend === 'up' ? 'Up' : 'Down'}
                          color={getStatusColor(resource.trend)}
                          size="small"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Resource Type Statistics */}
        <Grid item xs={12} lg={4}>
          <Paper sx={{ p: 3, boxShadow: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Resource Type Statistics
            </Typography>
            {analyticsData.resourceTypeStats.map((stat, index) => (
              <Box key={index} sx={{ mb: 3 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                    {stat.type}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.count} resources
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                  <Typography variant="body2">
                    Utilization: {stat.utilization}%
                  </Typography>
                  <Typography variant="body2" color="primary">
                    {stat.bookings} bookings
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={stat.utilization}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: '#e0e0e0'
                  }}
                />
              </Box>
            ))}
          </Paper>
        </Grid>

        {/* Usage Trends Chart */}
        <Grid item xs={12} lg={8}>
          <Paper sx={{ p: 3, boxShadow: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Usage Trends
            </Typography>
            <Box sx={{ mt: 2 }}>
              {analyticsData.usageTrends.map((trend, index) => (
                <Box key={index} sx={{ mb: 3 }}>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      {trend.month}
                    </Typography>
                    <Box display="flex" gap={2}>
                      <Typography variant="body2" color="primary">
                        {trend.bookings} bookings
                      </Typography>
                      <Typography variant="body2" color="secondary">
                        {trend.users} users
                      </Typography>
                    </Box>
                  </Box>
                  <Box display="flex" gap={1}>
                    <Box
                      sx={{
                        flex: 1,
                        backgroundColor: '#e0e0e0',
                        borderRadius: 1,
                        height: 12
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
                    <Box
                      sx={{
                        flex: 1,
                        backgroundColor: '#e0e0e0',
                        borderRadius: 1,
                        height: 12
                      }}
                    >
                      <Box
                        sx={{
                          width: `${(trend.users / 350) * 100}%`,
                          backgroundColor: '#2e7d32',
                          height: '100%',
                          borderRadius: 1
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
              ))}
              <Box display="flex" gap={3} mt={2} justifyContent="center">
                <Box display="flex" alignItems="center">
                  <Box sx={{ width: 12, height: 12, backgroundColor: '#1976d2', borderRadius: 1, mr: 1 }} />
                  <Typography variant="caption">Bookings</Typography>
                </Box>
                <Box display="flex" alignItems="center">
                  <Box sx={{ width: 12, height: 12, backgroundColor: '#2e7d32', borderRadius: 1, mr: 1 }} />
                  <Typography variant="caption">Users</Typography>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Monthly Statistics */}
        <Grid item xs={12} lg={4}>
          <Paper sx={{ p: 3, boxShadow: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Key Insights
            </Typography>
            {analyticsData.monthlyStats.map((stat, index) => (
              <Box key={index} sx={{ mb: 2, pb: 2, borderBottom: index < analyticsData.monthlyStats.length - 1 ? '1px solid #e0e0e0' : 'none' }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {stat.metric}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                  {stat.value}
                </Typography>
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Analytics;
