import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  LinearProgress,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';

const salesData = [
  { month: 'Jan', sales: 4000, leads: 24 },
  { month: 'Feb', sales: 3000, leads: 18 },
  { month: 'Mar', sales: 5000, leads: 29 },
  { month: 'Apr', sales: 2780, leads: 15 },
  { month: 'May', sales: 1890, leads: 11 },
  { month: 'Jun', sales: 2390, leads: 14 },
];

const Dashboard: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Customers
              </Typography>
              <Typography variant="h4">256</Typography>
              <Typography color="textSecondary">
                +12% from last month
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Active Leads
              </Typography>
              <Typography variant="h4">45</Typography>
              <Typography color="textSecondary">
                +5% from last month
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Revenue
              </Typography>
              <Typography variant="h4">$45,678</Typography>
              <Typography color="textSecondary">
                +8% from last month
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Conversion Rate
              </Typography>
              <Typography variant="h4">24%</Typography>
              <Typography color="textSecondary">
                +2% from last month
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Charts */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Sales Overview
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#8884d8" />
                <Bar dataKey="leads" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Recent Activities */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Activities
            </Typography>
            <Box>
              {[
                { title: 'New lead created', time: '2 hours ago' },
                { title: 'Customer meeting scheduled', time: '4 hours ago' },
                { title: 'Deal closed', time: '1 day ago' },
              ].map((activity, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Typography variant="subtitle2">{activity.title}</Typography>
                  <Typography color="textSecondary" variant="caption">
                    {activity.time}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Sales Pipeline */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Sales Pipeline
            </Typography>
            <Grid container spacing={2}>
              {[
                { stage: 'New Leads', value: 45, color: '#1976d2' },
                { stage: 'Qualified', value: 32, color: '#2196f3' },
                { stage: 'Proposal', value: 24, color: '#64b5f6' },
                { stage: 'Negotiation', value: 18, color: '#90caf9' },
                { stage: 'Closed Won', value: 12, color: '#4caf50' },
              ].map((stage) => (
                <Grid item xs={12} key={stage.stage}>
                  <Typography variant="subtitle2">
                    {stage.stage} ({stage.value})
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={(stage.value / 45) * 100}
                    sx={{
                      height: 10,
                      borderRadius: 5,
                      bgcolor: 'grey.200',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: stage.color,
                        borderRadius: 5,
                      },
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 