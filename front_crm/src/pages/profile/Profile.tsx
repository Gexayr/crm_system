import React, { useState } from 'react';
import {
  Box,
  Paper,
  Grid,
  Typography,
  TextField,
  Button,
  Avatar,
  Divider,
  Card,
  CardContent,
  Alert,
  IconButton,
  MenuItem,
} from '@mui/material';
import {
  Edit as EditIcon,
  PhotoCamera as PhotoCameraIcon,
} from '@mui/icons-material';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  location: string;
  bio: string;
  avatar: string;
  language: string;
  timeZone: string;
}

const mockProfile: UserProfile = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  position: 'Sales Manager',
  department: 'Sales',
  location: 'New York, USA',
  bio: 'Experienced sales professional with over 10 years in B2B sales and team management.',
  avatar: 'https://via.placeholder.com/150',
  language: 'en',
  timeZone: 'UTC-5',
};

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>(mockProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [savedMessage, setSavedMessage] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  const handleChange = (field: keyof UserProfile) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setProfile({
      ...profile,
      [field]: event.target.value,
    });
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({
          ...profile,
          avatar: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Profile
      </Typography>

      {savedMessage && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Profile updated successfully!
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Left Column - Profile Info */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6">Personal Information</Typography>
              <Button
                startIcon={<EditIcon />}
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? 'Cancel' : 'Edit'}
              </Button>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="First Name"
                  value={profile.firstName}
                  onChange={handleChange('firstName')}
                  fullWidth
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Last Name"
                  value={profile.lastName}
                  onChange={handleChange('lastName')}
                  fullWidth
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email"
                  value={profile.email}
                  onChange={handleChange('email')}
                  fullWidth
                  disabled={!isEditing}
                  type="email"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Phone"
                  value={profile.phone}
                  onChange={handleChange('phone')}
                  fullWidth
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Position"
                  value={profile.position}
                  onChange={handleChange('position')}
                  fullWidth
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Department"
                  value={profile.department}
                  onChange={handleChange('department')}
                  fullWidth
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Location"
                  value={profile.location}
                  onChange={handleChange('location')}
                  fullWidth
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Bio"
                  value={profile.bio}
                  onChange={handleChange('bio')}
                  fullWidth
                  multiline
                  rows={4}
                  disabled={!isEditing}
                />
              </Grid>
            </Grid>

            {isEditing && (
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  onClick={handleSave}
                  sx={{ minWidth: 120 }}
                >
                  Save Changes
                </Button>
              </Box>
            )}
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Preferences
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  label="Language"
                  value={profile.language}
                  onChange={handleChange('language')}
                  fullWidth
                  disabled={!isEditing}
                >
                  <MenuItem value="en">English</MenuItem>
                  <MenuItem value="es">Spanish</MenuItem>
                  <MenuItem value="fr">French</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  label="Time Zone"
                  value={profile.timeZone}
                  onChange={handleChange('timeZone')}
                  fullWidth
                  disabled={!isEditing}
                >
                  <MenuItem value="UTC-8">Pacific Time (UTC-8)</MenuItem>
                  <MenuItem value="UTC-5">Eastern Time (UTC-5)</MenuItem>
                  <MenuItem value="UTC+0">UTC</MenuItem>
                  <MenuItem value="UTC+1">Central European Time (UTC+1)</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Right Column - Avatar and Stats */}
        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 3 }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Box sx={{ position: 'relative', display: 'inline-block' }}>
                <Avatar
                  src={profile.avatar}
                  sx={{ width: 150, height: 150, mb: 2, mx: 'auto' }}
                />
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="avatar-upload"
                  type="file"
                  onChange={handleAvatarChange}
                  disabled={!isEditing}
                />
                {isEditing && (
                  <label htmlFor="avatar-upload">
                    <IconButton
                      component="span"
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        backgroundColor: 'background.paper',
                      }}
                    >
                      <PhotoCameraIcon />
                    </IconButton>
                  </label>
                )}
              </Box>
              <Typography variant="h6">
                {profile.firstName} {profile.lastName}
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                {profile.position}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2" color="textSecondary">
                {profile.department} • {profile.location}
              </Typography>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Account Statistics
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Member Since
                  </Typography>
                  <Typography variant="body1">Jan 2024</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Last Login
                  </Typography>
                  <Typography variant="body1">Today</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Total Deals
                  </Typography>
                  <Typography variant="body1">127</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Success Rate
                  </Typography>
                  <Typography variant="body1">78%</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile; 