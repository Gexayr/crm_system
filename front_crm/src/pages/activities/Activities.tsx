import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { RootState } from '../../store';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Button,
  Typography,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import {
  fetchActivities,
  createActivity,
  updateActivity,
  deleteActivity,
} from '../../store/slices/activitiesSlice';
import { Activity, CreateActivityRequest, UpdateActivityRequest } from '../../services/activityService';

import ActivityDialog from './ActivityDialog';

const Activities: React.FC = () => {
  const dispatch = useAppDispatch();
  const { activities, loading, error } = useAppSelector(
    (state: RootState) => state.activities
  );
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>();
  const [newActivity, setNewActivity] = useState<CreateActivityRequest>({
    type: 'task',
    subject: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    dueDate: new Date().toISOString(),
    relatedTo: '',
    assignedTo: ''
  });

  useEffect(() => {
    const loadActivities = async () => {
      try {
        await dispatch(fetchActivities()).unwrap();
      } catch (error) {
        console.error('Failed to fetch activities:', error);
      }
    };
    loadActivities();
  }, [dispatch]);

  // Add this console log to see what's in the state
  console.log('Current activities state:', activities);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAddActivity = async (data: CreateActivityRequest) => {
    try {
      await dispatch(createActivity(data)).unwrap();
      setDialogOpen(false);
    } catch (error) {
      console.error('Failed to create activity:', error);
    }
  };

  const handleEditActivity = async (data: UpdateActivityRequest) => {
    try {
      if (selectedActivity) {
        await dispatch(updateActivity({ 
          id: selectedActivity.id,
          data 
        })).unwrap();
        setDialogOpen(false);
        setSelectedActivity(undefined);
      }
    } catch (error) {
      console.error('Failed to update activity:', error);
    }
  };

  const handleDeleteActivity = async (id: string) => {
    try {
      await dispatch(deleteActivity(id)).unwrap();
    } catch (error) {
      console.error('Failed to delete activity:', error);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  // Ensure activities is an array
  const activitiesList = Array.isArray(activities) ? activities : [];

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">Activities</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setSelectedActivity(undefined);
            setDialogOpen(true);
          }}
        >
          Add Activity
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Related To</TableCell>
              <TableCell>Assigned To</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activitiesList
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell>
                    <Chip label={activity.type} size="small" />
                  </TableCell>
                  <TableCell>{activity.subject}</TableCell>
                  <TableCell>
                    <Chip
                      label={activity.status}
                      color={
                        activity.status === 'completed'
                          ? 'success'
                          : activity.status === 'cancelled'
                          ? 'error'
                          : 'warning'
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={activity.priority}
                      color={
                        activity.priority === 'high'
                          ? 'error'
                          : activity.priority === 'medium'
                          ? 'warning'
                          : 'success'
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{activity.dueDate}</TableCell>
                  <TableCell>{activity.relatedTo}</TableCell>
                  <TableCell>{activity.assignedTo}</TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => {
                        setSelectedActivity(activity);
                        setDialogOpen(true);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteActivity(activity.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={activitiesList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      <ActivityDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          setSelectedActivity(undefined);
        }}
        activity={selectedActivity}
        onSubmit={selectedActivity ? handleEditActivity : handleAddActivity}
      />
    </Box>
  );
};

export default Activities; 