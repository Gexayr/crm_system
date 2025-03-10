import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Tabs,
  Tab,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  Alert,
  Grid,
  MenuItem,
} from '@mui/material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const Settings: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [saved, setSaved] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Settings
      </Typography>

      <Paper sx={{ mt: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="General" />
          <Tab label="Profile" />
          <Tab label="Notifications" />
          <Tab label="Security" />
          <Tab label="Integrations" />
        </Tabs>

        {saved && (
          <Alert severity="success" sx={{ mt: 2 }}>
            Settings saved successfully!
          </Alert>
        )}

        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Company Information
              </Typography>
              <TextField
                label="Company Name"
                defaultValue="My Company"
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Website"
                defaultValue="www.mycompany.com"
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Contact Email"
                defaultValue="contact@mycompany.com"
                fullWidth
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                System Preferences
              </Typography>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Enable Email Notifications"
                sx={{ mb: 2, display: 'block' }}
              />
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Enable SMS Notifications"
                sx={{ mb: 2, display: 'block' }}
              />
              <FormControlLabel
                control={<Switch />}
                label="Enable Dark Mode"
                sx={{ mb: 2, display: 'block' }}
              />
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Personal Information
              </Typography>
              <TextField
                label="Full Name"
                defaultValue="John Doe"
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Email"
                defaultValue="john@example.com"
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Phone"
                defaultValue="+1234567890"
                fullWidth
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Preferences
              </Typography>
              <TextField
                select
                label="Language"
                defaultValue="en"
                fullWidth
                sx={{ mb: 2 }}
              >
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="es">Spanish</MenuItem>
                <MenuItem value="fr">French</MenuItem>
              </TextField>
              <TextField
                select
                label="Time Zone"
                defaultValue="UTC"
                fullWidth
                sx={{ mb: 2 }}
              >
                <MenuItem value="UTC">UTC</MenuItem>
                <MenuItem value="EST">EST</MenuItem>
                <MenuItem value="PST">PST</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Email Notifications
              </Typography>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="New Lead Notifications"
                sx={{ mb: 2, display: 'block' }}
              />
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Task Reminders"
                sx={{ mb: 2, display: 'block' }}
              />
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Payment Notifications"
                sx={{ mb: 2, display: 'block' }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                System Notifications
              </Typography>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Desktop Notifications"
                sx={{ mb: 2, display: 'block' }}
              />
              <FormControlLabel
                control={<Switch />}
                label="Sound Notifications"
                sx={{ mb: 2, display: 'block' }}
              />
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Change Password
              </Typography>
              <TextField
                label="Current Password"
                type="password"
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="New Password"
                type="password"
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Confirm New Password"
                type="password"
                fullWidth
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Two-Factor Authentication
              </Typography>
              <FormControlLabel
                control={<Switch />}
                label="Enable Two-Factor Authentication"
                sx={{ mb: 2, display: 'block' }}
              />
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={4}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                API Integration
              </Typography>
              <TextField
                label="API Key"
                defaultValue="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                fullWidth
                sx={{ mb: 2 }}
              />
              <Button variant="outlined" sx={{ mb: 2 }}>
                Generate New API Key
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                External Services
              </Typography>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Enable Google Calendar Integration"
                sx={{ mb: 2, display: 'block' }}
              />
              <FormControlLabel
                control={<Switch />}
                label="Enable Slack Integration"
                sx={{ mb: 2, display: 'block' }}
              />
            </Grid>
          </Grid>
        </TabPanel>

        <Divider />
        
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button sx={{ mr: 2 }}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            Save Changes
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Settings; 